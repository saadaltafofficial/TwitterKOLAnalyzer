import PropTypes from 'prop-types'


const Data = ({currentData, formatTimestamp}) => {
  return (
    <table className='min-w-full divide-y divide-gray-200'>
          <thead >
            <tr className='text-left'>
              {/* <th>Address</th> */}
              <th>Price</th>
              <th>Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.unixTime} className='text-left'>
                {/* <td>{item.address}</td> */}
                <td >{item.value}</td>
                <td>{formatTimestamp(item.unixTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
  )
}

Data.propTypes = {
  currentData: PropTypes.array.isRequired,
  formatTimestamp: PropTypes.func.isRequired
}

export default Data