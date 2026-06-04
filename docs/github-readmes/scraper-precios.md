# Price Scraper (Scraper de Precios)

> API que compara precios de supermercados

Comparar precios entre supermercados manualmente no escala. Este proyecto automatiza la extracción y exposición de precios vía API.

## Demo

- Live: https://precios.agustinjz.dev/
- Portfolio: https://agustinjz.dev/proyectos

## Stack

- Python
- FastAPI
- PostgreSQL
- BeautifulSoup
- Jinja2

## Features

- Scraping automatizado de precios
- API para consulta y comparación
- Persistencia en PostgreSQL
- Despliegue en producción

## Getting started

```bash
git clone https://github.com/Juarex9/prices-scraper.git
cd prices-scraper
pip install -r requirements.txt
# Configurar .env (DB, etc.)
uvicorn main:app --reload
```

## Author

**Agustín Juárez** — [Portfolio](https://agustinjz.dev) · [GitHub](https://github.com/Juarex9)
