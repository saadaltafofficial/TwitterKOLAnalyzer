import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types'

function Chart2() {
  const container = useRef();

  useEffect(() => {
    if (container.current) {
      // Check if the script is already appended
      if (!container.current.querySelector('script')) {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
          {
            "height": "100%",
            "symbol": "CRYPTOCAP: BTC",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "allow_symbol_change": true,
            "calendar": false,
            "support_host": "https://www.tradingview.com"
          }`;
        container.current.appendChild(script);
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

Chart2.defaultProps = {
    symbol: PropTypes.string.isRequired,
};

export default Chart2;