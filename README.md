# huseyinefeakpinar.com

Hüseyin Efe Akpınar'ın kişisel akademik arşivi ve blogu. İngilizce ve Türkçe.
[Eleventy](https://www.11ty.dev/) ile derleniyor, GitHub Pages üzerinde yayınlanıyor.

- İngilizce site kökte: `huseyinefeakpinar.com`
- Türkçe site `/tr/` altında: `huseyinefeakpinar.com/tr/`

---

## Klasör yapısı

```
src/
  _data/
    site.json      Alan adı, sosyal hesaplar, e-posta
    nav.json       Menü ve iki dildeki sayfa adresleri
    i18n.json      Arayüz metinleri (buton, rozet, etiket)
    files.js       src/files/ içeriğini şablonlara bildirir
  _includes/
    layouts/       base, page, post şablonları
    partials/      header, footer, seo, macros
  en/              İngilizce sayfalar (kökte yayımlanır)
    posts/         İngilizce içerik kayıtları (.md)
  tr/              Türkçe sayfalar (/tr/ altında yayımlanır)
    posts/         Türkçe içerik kayıtları (.md)
  css/style.css    Tasarım sistemi
  js/main.js       Yıl, mobil menü, yazdırma butonu
  files/           PDF ve indirilebilir dosyalar
  robots.njk, sitemap.njk
```

---

## Yerelde çalıştırma

Node.js 20 veya üstü gerekir.

```bash
npm install
npm start
```

`http://localhost:8080` adresini açın. Dosyaları kaydettikçe sayfa kendini yeniler.

Yayına hazır çıktıyı üretmek için:

```bash
npm run build
```

Çıktı `_site/` klasörüne yazılır. Bu klasör depoya girmez, GitHub Actions her
push'ta kendisi üretir.

---

## Yeni bir yazı eklemek

İngilizce bir içerik için `src/en/posts/` altına, Türkçe bir içerik için
`src/tr/posts/` altına yeni bir `.md` dosyası açın. Dosya adı adresin sonu olur:
`src/en/posts/knowledge-and-method.md` → `huseyinefeakpinar.com/posts/knowledge-and-method/`

Dosyanın başındaki `---` blokları arasına künye bilgileri yazılır:

| Alan | Zorunlu | Açıklama |
|---|---|---|
| `title` | evet | Yazının başlığı |
| `date` | evet | `YYYY-MM-DD`. Sıralama buna göre yapılır |
| `type` | evet | `essay`, `research`, `poetry` veya `mun`. Yazının hangi arşiv sayfasında görüneceğini belirler |
| `summary` | evet | Liste sayfalarında ve arama sonuçlarında görünen tek cümlelik özet |
| `dateLabel` | hayır | Tarih belirsizse ekranda bunun yerine bu yazar: `"2026"`, `"Sürüyor"` |
| `venue` | hayır | Yayımlandığı dergi/kurum |
| `externalUrl` | hayır | Yayının dış adresi |
| `pdf` | hayır | `/files/` içindeki bir PDF'e yol |
| `translationKey` | hayır | Aynı çalışmanın iki dildeki kaydını birbirine bağlar |
| `originalLang` | hayır | Çalışmanın asıl yazıldığı dil (`tr` / `en`) |
| `featured` | hayır | `true` ise ana sayfadaki "Seçilmiş çalışmalar" bölümünde çıkar |
| `tags` | hayır | Etiket listesi |

`---` bloğunun altına yazının metnini yazarsınız. Metin boş bırakılırsa sayfada
`summary` gösterilir — sadece dış bir yayına işaret eden kayıtlar için yeterlidir.

### Örnek 1 — dış bir yayının kaydı

```markdown
---
title: "Amerika'da Ralli mi Geliyor?"
date: 2024-10-17
type: essay
venue: "EconomiCAL"
externalUrl: "https://www.economicaldergi.com/"
summary: "Seçim sonrasında ABD piyasalarında bir ralli ihtimalini inceleyen yazı."
---
```

### Örnek 2 — sitede yayımlanan tam metin

```markdown
---
title: "What Makes a Method Scientific?"
date: 2026-05-12
type: essay
summary: "An essay on demarcation, evidence and the limits of method."
tags: [epistemology, methodology]
---

Buraya yazının tam metni Markdown olarak yazılır.

## Ara başlık

Paragraflar, **kalın**, *italik*, [bağlantı](https://ornek.com) ve listeler kullanılabilir.
```

Kaydettikten sonra yazı, `type` alanına göre ilgili arşiv sayfasında ve
`sitemap.xml` içinde otomatik olarak belirir. Elle liste güncellemek gerekmez.

---

## PDF ve dosya eklemek

Dosyayı `src/files/` içine koyun, ardından yazının künyesine yolunu yazın:

```yaml
pdf: "/files/gurcistan-protestolari.pdf"
```

CV'nin indirilebilir sürümü için dosya adları sabittir: `src/files/cv-en.pdf` ve
`src/files/cv-tr.pdf`. Bu dosyalar yoksa CV sayfasındaki indirme butonu hiç
görünmez, kırık bağlantı oluşmaz.

CV PDF'ini üretmenin en pratik yolu: `/cv/` sayfasını tarayıcıda açıp
"Bu sayfayı yazdır" butonuna basmak ve hedef olarak "PDF olarak kaydet"i seçmek.
Sayfanın yazdırma stilleri bunun için hazırlandı — menü ve alt bilgi çıkmaz,
düzen tek sütuna iner. Böylece PDF her zaman canlı CV ile aynı içeriği taşır.

---

## İki dil nasıl çalışır

Site arayüzü (menü, butonlar, etiketler) her iki dilde hazır. İçeriğin çevirisi
size ait ve zorunlu değil.

- Bir çalışmayı **iki dilde** yayımlamak isterseniz, iki dosya oluşturun ve
  ikisine de aynı `translationKey` değerini verin. Yazı sayfalarında birbirlerine
  bağlanırlar, menüdeki dil değiştirici de doğrudan karşılığına gider.
- Bir çalışmanın **tek dili** varsa yeterlidir: diğer dilin arşiv sayfasında yine
  görünür, yanında "İngilizce olarak yayımlandı" / "Published in Turkish"
  rozetiyle. Yani hiçbir çalışma çevirisi yok diye kaybolmaz.
- Sabit sayfa (Hakkımda, CV gibi) eklerken hem `src/en/` hem `src/tr/` altına
  koyun ve ikisine de aynı `pageKey` değerini verin; ardından `src/_data/nav.json`
  dosyasına iki dildeki adresi ve menü adını ekleyin.

---

## Sosyal hesaplar ve iletişim

`src/_data/site.json` içindeki alanları doldurun:

```json
"email": "ornek@ornek.com",
"social": {
  "linkedin": "https://...",
  "instagram": "https://...",
  "x": "https://...",
  "substack": "https://..."
}
```

Boş bıraktığınız alanlar alt bilgide ve Hakkımda sayfasında hiç görünmez.

---

## Yayına alma

`main` dalına yapılan her push, GitHub Actions üzerinden siteyi derleyip
GitHub Pages'e yayınlar. Ayrıntılar için [DEPLOY.md](DEPLOY.md).
