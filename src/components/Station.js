import React from 'react';
import Moment from 'react-moment';

const Station = props => {
  const {
    selectedStation,
    oncoming,
   } = props;
  return(
    <div className="sidebar_wrapper">
      <div className="station">
        <div className="header">
          <h1>{selectedStation}</h1>
        </div>
        <div className="body">
          <div className="container">
            <div className="row">
              {
                oncoming.map((train, i) => {
                  return (
                    <div className={train.rt + " " + "service" } key={i}>
                      <div className="col-sm-6 d-inline-flex text-left">
                        <h2>#{train.rn}</h2>
                        <p className="destination">{train.stpDe}</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="arrivalTime"><Moment fromNow>{train.arrT}</Moment></p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Station;
