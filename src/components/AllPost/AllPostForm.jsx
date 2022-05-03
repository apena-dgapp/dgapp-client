import React from 'react';
import Card from '../../common/components/Card/Card';
import Input from '../../common/components/Input/Input';

const AllPostForm = ({filteredArryPost, nextPage, backPage, onSearchChange, search, nextActive}) => {
    
  return (
    <> 
    
        <div className="allPostTitle-cont">
            <div className='allPostTitle'>AllPostForm</div>
        </div>

        <div className="allpost-input-cont">
          <div className="allpost-input">
                <Input
                    id="search"
                    name="searchpost"
                    type="text"
                    placeholder="Search Post..."
                    classInput="allpost-input-search"
                    value={search}
                    onChange={onSearchChange}
                /> 
            </div>    
        </div>
            
        <div className="allPost-Container">
            <div className="grid-container">

                {/* <div className='grid-card'>
                 
                </div> */}

                {
                    filteredArryPost().map((post) => {
                        return (
                            <Card
                            key={post.postId}
                            id={post.postId}
                            title={post.title}
                            img={post.image}
                            description={post.description}
                            date={post.createdAt}
                            />
                        )
                    })
                }
            </div>
        </div>

        <div className='allpost-btn-cont'>
            <div className='allpost-btns'>
                <button onClick={backPage} className="btn-back" name="btn-back" type="submit">Previous</button>
                <button onClick={nextPage} className="btn-next" name="btn-next" type="submit">Next</button> 
            </div>
        </div>
    </>
  )
}

export default AllPostForm