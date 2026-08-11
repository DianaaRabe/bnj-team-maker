# Cloudflare — sous-domaines `dev.`

> ⚠ **Approche abandonnée — document d'archive.**
>
> La décision retenue est de servir les landings **depuis le VPS**, aux
> côtés du site déjà en production, sous `/dev`, `/rh` et `/offshore`
> (voir la section « Déploiement » du `README.md`). Ni les sous-domaines
> décrits ci-dessous, ni le proxy Cloudflare un temps envisagé ne sont
> mis en œuvre.
>
> Ce document ne sert plus qu'à deux choses : retrouver ce qui a été créé
> à l'époque (les CNAME `dev` existent toujours et sont à supprimer une
> fois le VPS en place), et la section sur le token API et sa révocation,
> qui reste valable.

Objectif : servir la landing sur

- `dev.bnjteammaker.fr`
- `dev.bnjteammaker.com`

## État constaté

Les deux zones existent et sont **actives** sur le compte
`d4eaf6d6eda14ebb8840bafc2593893e` :

| Zone | Zone ID | Statut |
|---|---|---|
| `bnjteammaker.fr` | `b570117213e13af149bc92c3e01eb104` | active |
| `bnjteammaker.com` | `bdd45a98139246c4b46b877d1e2b3bf6` | active |

### ⚠ Le token API fourni ne suffit pas

Le token actuel peut **lister les zones** (`Zone > Zone > Read`) mais toute
opération sur les enregistrements DNS renvoie :

```
{"code": 10000, "message": "Authentication error"}
```

Il lui manque la permission **`Zone > DNS > Edit`**. Les enregistrements ne
peuvent donc pas être créés par API en l'état.

**Correction** : Cloudflare → *My Profile* → *API Tokens* → éditer le token
(ou en créer un nouveau) avec :

- Permission : `Zone` · `DNS` · `Edit`
- Zone Resources : inclure **les deux** zones (ou *All zones* du compte)

> Ce token a été transmis en clair dans une conversation. Profitez de cette
> étape pour le **révoquer et le régénérer** plutôt que de le modifier.

## Cible de l'enregistrement — Netlify

L'hébergement retenu est **Netlify**. Pour un sous-domaine, Netlify attend un
`CNAME` vers le domaine par défaut du site :

| Champ | Valeur |
|---|---|
| Type | `CNAME` |
| Nom | `dev` |
| Contenu | `<nom-du-site>.netlify.app` |
| Proxy Cloudflare | **DNS only** — nuage **gris** |
| TTL | Auto |

> Remplacer `<nom-du-site>` par le nom réel du site Netlify, visible dans
> *Site configuration → Site details → Site name*.

### Pourquoi le proxy doit rester désactivé

Netlify émet lui-même un certificat Let's Encrypt pour chaque domaine
personnalisé. Derrière le proxy orange de Cloudflare, Netlify ne voit plus le
domaine pointer vers lui et **l'émission du certificat échoue** — le site
répond alors en erreur TLS.

Si le proxy est activé plus tard, il faut impérativement passer le mode
SSL/TLS de Cloudflare sur **Full (strict)**. En mode *Flexible*, Cloudflare
parle en HTTP à Netlify qui redirige vers HTTPS : boucle de redirection.

## Créer les enregistrements par API

Une fois le token corrigé :

```bash
set -a && . ./.env.local && set +a

# ⚠ Renseigner le nom du site Netlify.
CONTENT=<nom-du-site>.netlify.app

for ZONE in b570117213e13af149bc92c3e01eb104 bdd45a98139246c4b46b877d1e2b3bf6; do
  curl -s -X POST \
    "https://api.cloudflare.com/client/v4/zones/$ZONE/dns_records" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data "{
      \"type\": \"CNAME\",
      \"name\": \"dev\",
      \"content\": \"$CONTENT\",
      \"proxied\": false,
      \"ttl\": 1,
      \"comment\": \"Landing developpeurs\"
    }"
  echo
done
```

`"ttl": 1` signifie *automatique*. `"name": "dev"` suffit — Cloudflare complète
avec le nom de la zone. `"proxied": false` = nuage gris, requis ci-dessus.

## Vérifier

```bash
set -a && . ./.env.local && set +a
for ZONE in b570117213e13af149bc92c3e01eb104 bdd45a98139246c4b46b877d1e2b3bf6; do
  curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE/dns_records?name=dev" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
  echo
done
```

Puis, une fois la propagation faite :

```bash
dig +short dev.bnjteammaker.fr
dig +short dev.bnjteammaker.com
```

## Côté Netlify

Le DNS seul ne suffit pas : Netlify doit savoir qu'il sert ces domaines, sinon
il répond « Not Found » même si le DNS résout correctement.

1. *Site configuration* → *Domain management* → **Add a domain**.
2. Ajouter `dev.bnjteammaker.fr`, puis `dev.bnjteammaker.com`.
3. Netlify détecte le CNAME et provisionne un certificat Let's Encrypt
   (compter quelques minutes).
4. Choisir lequel des deux est le domaine principal ; Netlify redirigera
   l'autre vers celui-là.

### Variables d'environnement

À renseigner dans *Site configuration* → *Environment variables* — sans elles
le panneau de réservation part en état d'erreur :

- `CAL_API_KEY`
- `NEXT_PUBLIC_CAL_USERNAME`

Le fichier `.env.local` n'est **pas** déployé : il est gitignoré.
