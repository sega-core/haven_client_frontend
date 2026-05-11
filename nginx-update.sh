#!/bin/bash chmod +x nginx-update.sh

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Начинаем обновление Nginx конфигурации...${NC}"

# Проверяем существование файла конфигурации
if [ ! -f "nginx_ssl.conf" ]; then
    echo -e "${RED}❌ Ошибка: Файл nginx_ssl.conf не найден!${NC}"
    exit 1
fi

# Проверяем существование контейнера
if ! docker ps --format 'table {{.Names}}' | grep -q "haven_client_frontend"; then
    echo -e "${RED}❌ Ошибка: Контейнер haven_client_frontend не запущен!${NC}"
    exit 1
fi

# Копируем конфигурацию
echo -e "${YELLOW}📁 Копируем конфигурацию...${NC}"
if docker cp nginx_ssl.conf haven_client_frontend:/etc/nginx/conf.d/default.conf; then
    echo -e "${GREEN}✅ Конфигурация скопирована${NC}"
else
    echo -e "${RED}❌ Ошибка при копировании${NC}"
    exit 1
fi

# Перезагружаем nginx
echo -e "${YELLOW}🔄 Перезагружаем Nginx...${NC}"
if docker exec haven_client_frontend nginx -s reload; then
    echo -e "${GREEN}✅ Nginx успешно перезагружен!${NC}"
else
    echo -e "${RED}❌ Ошибка при перезагрузке Nginx${NC}"
    exit 1
fi