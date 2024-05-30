import { FormSelect } from '../components/Form';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';


type AppProps = {
    PageClick?: (data: any) => any
    onPageChange?: (data: any) => any
    itemsPerPage: number,
    items: number
    initPage?: number
}

// function Items({ currentItems }) {
//     return (
//         <>
//             {currentItems &&
//                 currentItems.map((item, index) => (
//                     <div key={index}>
//                         <h3>Item #{item} </h3>
//                     </div>
//                 ))
//             }
//         </>
//     );
// }

function PaginatedItems({ itemsPerPage, items, onPageChange, initPage }: AppProps) {
    useEffect(() => {
        console.log('initPage ', initPage)
        // console.log('itemsPerPage ', itemsPerPage)
        // console.log('items ', items)
    }, [initPage])
    // const [itemOffset, setItemOffset] = useState(0);
    const newItem = Array.from({ length: items }, (v: any, i: number) => i + 1)

    // const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // const currentItems = newItem.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(newItem.length / itemsPerPage);



    const handlePageClick = (event : any) => {
        const newOffset = (+event.selected * itemsPerPage) % newItem.length;
        // setItemOffset(newOffset);
        onPageChange && onPageChange({ currentPage: newOffset + 1, pageNumber: event.selected + 1 })
    };

    return (
        <>
            {/* <Items currentItems={currentItems} /> */}
            <div className="flex flex-row space-x-4">
                {/* <div className="self- mr-auto">Show: {newOffset + 1 ?? 1}/{paginate.totalElements} pages</div>
                </div> */}
                <div>
                    <ReactPaginate
                        forcePage={initPage? initPage - 1 : undefined}
                        breakLabel="..."
                        nextLabel=" >>"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel=" <<"
                        renderOnZeroPageCount={null}
                        containerClassName="inline-flex flex-wrap"
                        pageClassName="p-2 m-2 w-12 text-center hover:bg-slate-100 text-xs"
                        breakClassName="p-2 m-2"
                        nextClassName="p-2 m-2 w-12 text-center hover:bg-slate-100"
                        previousClassName="p-2 m-2 w-12 text-center hover:bg-slate-100"
                        activeClassName="text-bold border-2 bg-slate-200 rounded"
                    />
                    <FormSelect onChange={(e) => {
                        // PageClick({ pageSize: +e.target.value, currentPage: 1, pageNumber: 1 })
                        onPageChange && onPageChange({ pageSize: +e.target.value, currentPage: 1, pageNumber: 1 })
                    }}
                        className="mt-2 sm:mt-0 sm:w-auto text-xs w-48"
                    >
                        {[10, 20, 50, 100].map((pagerSize: number) => (
                            <option key={pagerSize} value={pagerSize}>{pagerSize}</option>
                        ))}

                    </FormSelect>
                </div>
            </div>

        </>
    );
}

export default PaginatedItems