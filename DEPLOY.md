# Yayınlama rehberi

Site artık elle yüklenen bir HTML klasörü değil; `main` dalına yapılan her push'ta
GitHub Actions tarafından derlenip yayınlanıyor.

## Bir kerelik kurulum

1. GitHub'da depoya gidin: **Settings → Pages**.
2. **Source** ayarını **GitHub Actions** olarak seçin.
   (Eski "Deploy from a branch" seçeneği artık kullanılmıyor — bu ayar
   değiştirilmezse workflow çalışsa bile site güncellenmez.)
3. **Settings → Pages → Custom domain** alanına `huseyinefeakpinar.com` yazın ve
   **Enforce HTTPS** kutusunu işaretleyin.
4. Alan adı kayıt firmanızda, GitHub'ın Pages ekranında gösterdiği DNS kayıtlarını
   oluşturun. Kayıtları tahmin etmeyin; GitHub'ın o an gösterdiği değerleri kullanın.

`src/CNAME` dosyası alan adını taşır ve her derlemede çıktının köküne kopyalanır,
bu yüzden özel alan adı ayarı push'lar arasında kaybolmaz.

## Günlük akış

```bash
npm start          # yerelde önizle
git add -A
git commit -m "Yeni yazı: ..."
git push
```

Push'tan sonra deponun **Actions** sekmesinden derlemenin durumunu görebilirsiniz.
Yeşil tik göründükten bir iki dakika sonra site güncellenir.

Workflow dosyası: `.github/workflows/deploy.yml`. Derleme adımı `npm ci` ve
`npm run build` çalıştırır, `_site/` klasörünü Pages'e yükler.

## Derleme bozulursa

- Actions sekmesindeki kırmızı adıma tıklayıp hata metnini okuyun.
- Aynı hatayı yerelde `npm run build` ile birebir tekrarlayabilirsiniz.
- En sık neden, bir `.md` dosyasının künye bloğunda tırnak veya iki nokta hatasıdır.

## Yayın sonrası

- `https://huseyinefeakpinar.com/sitemap.xml` ve `/robots.txt` adreslerinin
  açıldığını doğrulayın.
- Site haritasını Google Search Console ve Bing Webmaster Tools'a tanıtın.
- Gizli sekmede kendi adınızı aratıp başlık ve açıklamanın doğru göründüğünü
  kontrol edin.
- Sitedeki dış bağlantıları bir kez tek tek açın.

## Başka bir barındırıcı kullanmak

Cloudflare Pages, Netlify veya Vercel'e bağlarken:

- Build komutu: `npm run build`
- Yayın klasörü: `_site`

Alan adı değişirse `src/_data/site.json` içindeki `url` alanını güncelleyin;
`robots.txt`, `sitemap.xml` ve tüm canonical/hreflang etiketleri oradan beslenir.
