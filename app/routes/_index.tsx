import React, { useEffect, useState } from 'react';

// Define the type for a single price data item
interface PriceDataItem {
  address: string;
  unixTime: number;
  value: number;
}

// Define the type for the API response
interface ApiResponse {
  data: {
    items: PriceDataItem[];
  };
}

const Index: React.FC = () => {
  const [priceData, setPriceData] = useState<PriceDataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://public-api.birdeye.so/defi/history_price?address=8yzhCAYrfUqm7VcThcpfmosE3SPZhV6WNHkBmum4mHqf&address_type=pair&type=15m&time_from=1734425317&time_to=1734511717'
        );
        const data: ApiResponse = await response.json(); // Use ApiResponse type
        console.log(data)
        setPriceData(data.data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Add types for function parameters
  const formatTimestamp = (unixTime: number): string => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleString(); // Adjust options as needed
  };

  const formatPrice = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div>
      <h2>Price History</h2>
      <table>
        <thead>
          <tr>
            <th>Date and Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className='text-white'>
          {priceData.map((item) => (
            <tr key={item.unixTime}>
              <td>{formatTimestamp(item.unixTime)}</td>
              <td>{formatPrice(item.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
