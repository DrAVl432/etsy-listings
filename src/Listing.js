import React from 'react';
import './App.css';

const Listing = ({ items = [] }) => {
  return (
    <div className="item-list">
      {items.map(item => {
        // Деструктуризация с дополнительной проверкой на присутствие значений
        const {
          listing_id,
          url = '#', // Убедитесь, что есть URL, даже если он undefined
          MainImage = {}, // Предотвращаем доступ к необъявленным свойствам
          title = 'No title',
          currency_code = 'USD',
          price = '0.00',
          quantity = 0
        } = item || {}; // Обработка случаев, если item может быть undefined

        // Обработка заголовка
        const shortTitle = title.length > 50 ? title.substring(0, 50) + '…' : title;

        // Форматирование цены
        let priceDisplay;
        switch (currency_code) {
          case 'USD':
            priceDisplay = `$${price}`;
            break;
          case 'EUR':
            priceDisplay = `€${price}`;
            break;
          default:
            priceDisplay = `${price} ${currency_code}`;
        }

        // Уровень количества
        const quantityClass =
          quantity <= 10 ? 'level-low' :
          quantity <= 20 ? 'level-medium' :
                          'level-high';

        return (
          <div className="item" key={listing_id}>
            <div className="item-image">
              <a href={url}>
                {/* Оператор условного доступа для предотвращения ошибок */}
                <img src={MainImage?.url_570xN || 'placeholder_image_url_here'} alt={shortTitle} />
              </a>
            </div>
            <div className="item-details">
              <p className="item-title">{shortTitle}</p>
              <p className="item-price">{priceDisplay}</p>
              <p className={`item-quantity ${quantityClass}`}>{quantity} left</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Listing;