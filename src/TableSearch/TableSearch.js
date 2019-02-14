import React from 'react'

export default () => {

    return (
        <div className="input-group mb-3 mt-3">
             <div className="input-group-prepend">
                 <button className="btn btn-outline-secondary" >Search</button>
            </div>
             <input type="text" className="form-control" />
        </div>
    )
}