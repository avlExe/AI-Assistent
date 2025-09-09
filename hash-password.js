const bcrypt = require('bcryptjs');

async function hashPassword() {
  try {
    const password = 'Skidoo12!@2007';
    const hash = await bcrypt.hash(password, 12);
    console.log('🔐 Пароль:', password);
    console.log('🔑 Хеш:', hash);
    
    // Проверим, что хеш работает
    const isValid = await bcrypt.compare(password, hash);
    console.log('✅ Проверка хеша:', isValid);
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
  }
}

hashPassword();
