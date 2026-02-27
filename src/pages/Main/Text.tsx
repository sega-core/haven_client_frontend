interface MoodDashboardMobileProps {
  data: MoodEntry[];
}

export const MoodDashboardMobile = ({ data }: MoodDashboardMobileProps) => {
  return (
    <div className="space-y-4 p-4">
      {/* Заголовок */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-brown-primary">Моё настроение</h2>
        <div className="bg-beige-tertiary px-3 py-1 rounded-full">
          <span className="text-sm text-brown-primary">
            Записей: {data.length}
          </span>
        </div>
      </div>
      
      {/* Мини-график */}
      <MiniMoodChart data={data} />
      
      {/* Календарь */}
      <MoodCalendar data={data} days={35} />
      
      {/* Последние записи */}
      <MoodList data={data} limit={5} />
    </div>
  );
};

interface MiniMoodChartProps {
  data: MoodEntry[];
  days?: number;
}

export const MiniMoodChart = ({ data, days = 14 }: MiniMoodChartProps) => {
  const sortedData = [...data]
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .slice(-days);

  const maxLevel = 5;
  const chartHeight = 60;

  const getLevelColor = (level: number) => {
    const colors = {
      1: '#EF4444',
      2: '#F59E0B',
      3: '#FBBF24',
      4: '#10B981',
      5: '#3B82F6'
    };
    return colors[level as keyof typeof colors] || '#9CA3AF';
  };

  return (
    <div className="bg-white-primary rounded-2xl p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-brown-primary font-medium">Тренд настроения</h3>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(level => (
            <div key={level} className="flex items-center gap-0.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getLevelColor(level) }} />
              <span className="text-[8px] text-brown-secondary">{level}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-end gap-0.5 h-16">
        {sortedData.map((entry, i) => (
          <div
            key={entry.id}
            className="flex-1 flex flex-col items-center group relative"
          >
            <div
              className="w-full rounded-t transition-all group-hover:opacity-80"
              style={{
                height: `${(entry.level / maxLevel) * chartHeight}px`,
                backgroundColor: getLevelColor(entry.level),
                minHeight: '4px'
              }}
            />
            
            {/* Tooltip при наведении */}
            <div className="absolute bottom-full mb-1 hidden group-hover:block">
              <div className="bg-white text-xs rounded-lg shadow-lg p-1 whitespace-nowrap">
                <div className="font-medium">{['😞', '😐', '🙂', '😊', '😁'][entry.level - 1]} {entry.level}/5</div>
                {entry.comment && <div className="text-brown-secondary">{entry.comment}</div>}
                <div className="text-[10px] text-brown-secondary">
                  {new Date(entry.createdAt).toLocaleDateString('ru-RU')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-1 text-[8px] text-brown-secondary">
        {sortedData.map((entry, i) => (
          <span key={entry.id}>
            {new Date(entry.createdAt).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}
          </span>
        ))}
      </div>
    </div>
  );
};

interface MoodListProps {
  data: MoodEntry[];
  limit?: number;
}

export const MoodList = ({ data, limit = 10 }: MoodListProps) => {
  const sortedData = [...data]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);

  const getMoodEmoji = (level: number) => {
    return ['😞', '😐', '🙂', '😊', '😁'][level - 1];
  };

  const getMoodText = (level: number) => {
    return ['Очень плохо', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'][level - 1];
  };

  return (
    <div className="bg-white-primary rounded-2xl p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-brown-primary font-medium">Последние записи</h3>
        <span className="text-xs text-brown-secondary">Среднее: {
          (data.reduce((sum, d) => sum + d.level, 0) / data.length).toFixed(1)
        }</span>
      </div>
      
      <div className="space-y-2">
        {sortedData.map(entry => (
          <div
            key={entry.id}
            className="flex items-center gap-3 p-2 bg-beige-light/20 rounded-xl"
          >
            {/* Эмодзи и уровень */}
            <div className="flex items-center gap-1">
              <span className="text-xl">{getMoodEmoji(entry.level)}</span>
              <span className="text-xs font-medium text-brown-primary">
                {entry.level}/5
              </span>
            </div>
            
            {/* Теги и комментарий */}
            <div className="flex-1 min-w-0">
              {entry.tags.length > 0 && (
                <div className="flex gap-1 overflow-x-auto pb-0.5">
                  {entry.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] px-1.5 py-0.5 bg-beige-tertiary rounded-full whitespace-nowrap"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              {entry.comment && (
                <p className="text-xs text-brown-secondary truncate">{entry.comment}</p>
              )}
            </div>
            
            {/* Дата */}
            <span className="text-[10px] text-brown-secondary whitespace-nowrap">
              {new Date(entry.createdAt).toLocaleDateString('ru-RU', { 
                day: '2-digit', 
                month: '2-digit' 
              })}
            </span>
          </div>
        ))}
      </div>
      
      {data.length > limit && (
        <button className="w-full mt-3 text-center text-sm text-beige-primary py-2">
          Показать еще
        </button>
      )}
    </div>
  );
};

import { format, eachDayOfInterval, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';

interface MoodCalendarProps {
  data: MoodEntry[];
  days?: number; // количество дней для отображения
}

export const MoodCalendar = ({ data, days = 35 }: MoodCalendarProps) => {
  const endDate = new Date();
  const startDate = subDays(endDate, days);
  
  const daysArray = eachDayOfInterval({ start: startDate, end: endDate });
  
  const getMoodForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return data.find(entry => 
      format(new Date(entry.createdAt), 'yyyy-MM-dd') === dateStr
    );
  };

  const getMoodColor = (level?: number) => {
    if (!level) return 'bg-gray-100';
    const colors = {
      1: 'bg-red-200',
      2: 'bg-orange-200',
      3: 'bg-yellow-200',
      4: 'bg-green-200',
      5: 'bg-blue-200'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100';
  };

  return (
    <div className="bg-white-primary rounded-2xl p-4">
      <h3 className="text-brown-primary font-medium mb-3">Календарь настроения</h3>
      
      <div className="grid grid-cols-7 gap-1">
        {/* Дни недели */}
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
          <div key={day} className="text-center text-xs text-brown-secondary py-1">
            {day}
          </div>
        ))}
        
        {/* Ячейки дней */}
        {daysArray.map(date => {
          const mood = getMoodForDate(date);
          const dayNumber = format(date, 'd');
          const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
          
          return (
            <div
              key={date.toISOString()}
              className={`
                aspect-square rounded-lg flex flex-col items-center justify-center
                transition-all active:scale-95
                ${getMoodColor(mood?.level)}
                ${isToday ? 'ring-2 ring-beige-primary' : ''}
              `}
            >
              <span className={`text-xs font-medium ${mood ? 'text-brown-primary' : 'text-gray-400'}`}>
                {dayNumber}
              </span>
              {mood && (
                <span className="text-[10px] leading-none mt-0.5">
                  {['😞', '😐', '🙂', '😊', '😁'][mood.level - 1]}
                </span>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Легенда */}
      <div className="mt-4 flex justify-between">
        {[1, 2, 3, 4, 5].map(level => (
          <div key={level} className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${getMoodColor(level)}`} />
            <span className="text-xs text-brown-secondary">
              {['Плохо', 'Не очень', 'Норм', 'Хорошо', 'Отлично'][level - 1]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};