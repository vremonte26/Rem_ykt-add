// ВРЕМОНТЕ | Основное приложение
class App {
    constructor() {
        this.user = null;
        this.currentView = 'loading';
    }
    
    init() {
        console.log('🚀 Времонте инициализируется...');
        
        // Проверяем авторизацию
        this.checkAuth();
        
        // Загружаем представление
        this.loadView();
        
        // Регистрируем PWA
        this.registerServiceWorker();
    }
    
    checkAuth() {
        // Проверяем есть ли токен
        const token = localStorage.getItem('vremonte_token');
        if (token) {
            this.user = JSON.parse(localStorage.getItem('vremonte_user'));
            this.currentView = 'main';
        } else {
            this.currentView = 'auth';
        }
    }
    
    loadView() {
        const app = document.getElementById('app');
        
        switch(this.currentView) {
            case 'loading':
                // Уже показан
                break;
                
            case 'auth':
                app.innerHTML = this.getAuthScreen();
                break;
                
            case 'main':
                app.innerHTML = this.getMainScreen();
                break;
        }
    }
    
    getAuthScreen() {
        return `
            <div class="auth-screen">
                <div class="logo">🏔️</div>
                <h1>Времонте</h1>
                <p>Безопасные услуги в Якутии</p>
                
                <div class="auth-buttons">
                    <button class="btn" onclick="app.startRegistration()">
                        <span class="icon">📱</span>
                        <span class="text">Войти по СМС</span>
                    </button>
                    
                    <p class="small-text">
                        🔒 Все мастера проверены<br>
                        📍 Только ваш район (10 км)<br>
                        ⭐ Бесплатно для всех
                    </p>
                </div>
            </div>
        `;
    }
    
    getMainScreen() {
        return `
            <div class="main-screen">
                <div class="header">
                    <div class="user-info">
                        <div class="avatar">${this.user?.name?.charAt(0) || '👤'}</div>
                        <div class="user-name">${this.user?.name || 'Пользователь'}</div>
                    </div>
                </div>
                
                <div class="content">
                    <h2>Что вам нужно?</h2>
                    
                    <button class="btn" onclick="app.showClientMode()">
                        <span class="icon">🎯</span>
                        <span class="text">Создать заказ</span>
                        <small>Нужен мастер</small>
                    </button>
                    
                    <div class="divider">или</div>
                    
                    <button class="btn" onclick="app.showMasterMode()">
                        <span class="icon">👷</span>
                        <span class="text">Стать мастером</span>
                        <small>Ищу работу</small>
                    </button>
                </div>
            </div>
        `;
    }
    
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(() => console.log('✅ Service Worker зарегистрирован'))
                .catch(err => console.error('❌ Ошибка Service Worker:', err));
        }
    }
    
    startRegistration() {
        alert('Регистрация через Telegram-бота будет здесь');
        // В следующем обновлении добавим
    }
    
    showClientMode() {
        alert('Режим клиента - создание заказа');
    }
    
    showMasterMode() {
        alert('Режим мастера - лента заказов');
    }
}

// Создаём глобальный экземпляр
const app = new App();
