

const pagination = ({ dataPerPage, totalData, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
        pageNumbers.push(i);
    }
    
  return (
    <nav>
        <ul className="flex justify-center flex-wrap">
            {pageNumbers.map(number => (
                <li key={number} className="m-2 py-1 px-2 bg-slate-200 hover:bg-slate-300 rounded-lg hover:cursor-pointer">
                    <a onClick={() => paginate(number)}>{number}</a>
                </li>
            ))}
        </ul>
    </nav>
  )
}
export default pagination