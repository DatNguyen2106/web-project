import React from 'react';
import "../Style/PaginationBar.css";

class PaginationBar extends React.Component{
    render(){
        let {totalPage, activePage, changePage, changePageDirect} = this.props;
        let items = [];
        let prevPage = (activePage>1 ? activePage-1 : activePage);
        let nextPage = (activePage<totalPage ? activePage+1 : activePage);

        if (prevPage > 1){
            items.push(<span key="1" className="page-number" onClick={()=>{changePageDirect(1)}}>1</span>);
            if (prevPage > 2){
                items.push(<span key="prev" className="page-number">...</span>);
            }
        }
        for (let number = prevPage; number <= nextPage; number++) {
            items.push (
                <span key={number} className={"page-number " + (number === activePage ? "active-page-number" : "")} onClick={()=>{changePageDirect(number)}}>{number}</span>
        )}
        if (nextPage < totalPage){
            if (nextPage < totalPage - 1){
                items.push(<span key="next" className="page-number">...</span>);
            }   
            items.push(<span key={totalPage} className="page-number" onClick={()=>{changePageDirect(totalPage)}}>{totalPage}</span>);
        }
        
        return (
            <div className="pagination">
                <button onClick={()=>{changePage("prev")}}>Prev</button>
                    {items}
                <button onClick={()=>{changePage("next")}}>Next</button>
            </div>
        );
    }

}

export default PaginationBar;