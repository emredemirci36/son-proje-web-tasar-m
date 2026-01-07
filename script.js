// 1. Sayfa Yüklenme Olayı - DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Hoş geldiniz mesajı
    alert('PortCity Tanıtım Sitesine Hoş Geldiniz');
    
    // Global değişkenler
    let likeCount = 0;
    let currentTheme = 'light';
    
    // Aktivite listesi
    const activities = [
        { name: "Tekne Turu", description: "PortCity koylarını keşfedin" },
        { name: "Dalış Deneyimi", description: "Sualtı dünyasını keşfedin" },
        { name: "Marina Restoranları", description: "Deniz ürünleri ziyafeti" },
        { name: "Gün Batımı Yürüyüşü", description: "Muhteşem manzaralar eşliğinde" },
        { name: "Balık Tutma Turu", description: "Denizden taze balık yakalayın" },
        { name: "Yat Kiralama", description: "Lüks yatlarla gezinti" },
        { name: "Su Sporları", description: "Jet ski, kano ve daha fazlası" },
        { name: "Liman Gezisi", description: "Tarihi liman bölgesini keşfedin" }
    ];
    
    // 2. Menü Etkileşimi - mouseover & mouseout
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        // Mouse over event
        link.addEventListener('mouseover', function() {
            this.style.color = '#3498db';
            this.style.transition = 'color 0.3s ease';
        });
        
        // Mouse out event
        link.addEventListener('mouseout', function() {
            // Aktif sayfa hariç diğerleri eski haline dönsün
            if (!this.classList.contains('active')) {
                this.style.color = '';
            }
        });
    });
    
    // 3. Aktif Sayfa Vurgulama - click
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Sayfa geçişlerinde aktif class'ı güncelle
            menuLinks.forEach(item => {
                item.classList.remove('active');
                item.style.color = '';
            });
            
            this.classList.add('active');
            this.style.color = 'white';
        });
    });
    
    // 4. Tema Değiştirme Butonu - click
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const body = document.body;
            
            if (currentTheme === 'light') {
                // Karanlık temaya geç
                body.classList.add('dark-theme');
                currentTheme = 'dark';
                this.textContent = '☀️ Açık Tema';
            } else {
                // Açık temaya geç
                body.classList.remove('dark-theme');
                currentTheme = 'light';
                this.textContent = '🎨 Tema Değiştir';
            }
            
            // Tema değişikliğini localStorage'a kaydet
            localStorage.setItem('portcity-theme', currentTheme);
        });
        
        // Sayfa yüklendiğinde kayıtlı temayı uygula
        const savedTheme = localStorage.getItem('portcity-theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            currentTheme = 'dark';
            themeToggleBtn.textContent = '☀️ Açık Tema';
        }
    }
    
    // 5. Mouseover Bilgi Kutusu (services.html için) - mouseover + mouseout
    if (window.location.pathname.includes('services.html') || 
        window.location.href.includes('services.html')) {
        const servicesList = document.getElementById('servicesList');
        
        // Hizmetleri listele
        if (servicesList) {
            activities.forEach((activity, index) => {
                const serviceItem = document.createElement('div');
                serviceItem.className = 'service-item';
                serviceItem.innerHTML = `
                    <h3>${activity.name}</h3>
                    <div class="service-description">${activity.description}</div>
                `;
                servicesList.appendChild(serviceItem);
                
                // Hover efekti için mouseover ve mouseout event'leri
                const description = serviceItem.querySelector('.service-description');
                
                serviceItem.addEventListener('mouseover', function() {
                    description.style.opacity = '1';
                    description.style.visibility = 'visible';
                });
                
                serviceItem.addEventListener('mouseout', function() {
                    description.style.opacity = '0';
                    description.style.visibility = 'hidden';
                });
            });
        }
    }
    
    // 6. Dinamik Aktivite Listesi - Array + Loop
    const activitiesList = document.getElementById('activitiesList');
    if (activitiesList) {
        // forEach döngüsü kullanarak aktiviteleri listele
        activities.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `<h3>${activity.name}</h3><p>${activity.description}</p>`;
            activitiesList.appendChild(activityItem);
        });
    }
    
    // 7. Beğeni Sayacı - click event
    const likeBtn = document.getElementById('likeBtn');
    const likeCountElement = document.getElementById('likeCount');
    
    if (likeBtn && likeCountElement) {
        // localStorage'dan beğeni sayısını yükle
        const savedLikes = localStorage.getItem('portcity-likes');
        if (savedLikes) {
            likeCount = parseInt(savedLikes);
            likeCountElement.textContent = likeCount;
        }
        
        likeBtn.addEventListener('click', function() {
            likeCount++;
            likeCountElement.textContent = likeCount;
            
            // Beğeni sayısını localStorage'a kaydet
            localStorage.setItem('portcity-likes', likeCount);
            
            // Butona geçici efekt ekle
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // 8. İletişim Formu Kontrolü - submit event
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Formun normal submit işlemini engelle
            
            // Form alanlarını al
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Form doğrulama
            if (!name || !email || !message) {
                formMessage.textContent = 'Lütfen tüm alanları doldurun!';
                formMessage.className = 'form-message error';
                return;
            }
            
            // E-posta doğrulama (basit)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.textContent = 'Lütfen geçerli bir e-posta adresi girin!';
                formMessage.className = 'form-message error';
                return;
            }
            
            // Form gönderimi başarılı
            formMessage.textContent = 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';
            formMessage.className = 'form-message success';
            
            // Formu sıfırla
            contactForm.reset();
            
            // Mesajı 5 saniye sonra gizle
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
    
    // 9. Görsel Etkileşimi - click
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            // Toggle yöntemi ile genişlet/küçült
            if (this.dataset.expanded === 'false') {
                this.classList.add('expanded');
                this.dataset.expanded = 'true';
            } else {
                this.classList.remove('expanded');
                this.dataset.expanded = 'false';
            }
        });
    });
    
    // Ekstra: Sayfa başlığına dinamik etkileşim
    const pageTitle = document.querySelector('h1');
    if (pageTitle) {
        pageTitle.addEventListener('mouseover', function() {
            this.style.color = '#3498db';
        });
        
        pageTitle.addEventListener('mouseout', function() {
            this.style.color = '';
        });
    }
    
    // Sayfa yüklendiğinde tüm görseller için data-expanded özelliğini ayarla
    document.querySelectorAll('.gallery-image').forEach(img => {
        if (!img.hasAttribute('data-expanded')) {
            img.setAttribute('data-expanded', 'false');
        }
    });
});