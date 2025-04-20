import React from 'react';
import './Package.css';
import Topheader from '../topheader/topheader';
import { Link } from 'react-router-dom';

const packages = [
  {
    type: 'BASIC',
    classes: '6 Classes',
    features: [
      '60 min classes',
      '6 classes covering 1 Half Term',
      'No free cancellations',
    ],
    color: 'basic-card',
  },
  {
    type: 'Silver',
    classes: '6 Classes',
    features: [
      '60 min classes',
      '6 classes covering 1 Half Term',
      'No free cancellations',
    ],
    color: 'silver-card',
  },
  {
    type: 'Gold',
    classes: '12 Classes',
    features: [
      '60 min classes',
      '12 classes covering 1 Full Term',
      '1st Preference Weekends',
      'Post Lesson Reports',
      'End of Term Report',
      '2 Free reschedules',
    ],
    color: 'gold-card',
    popular: true,
  },
  {
    type: 'Platinum',
    classes: '12 Classes',
    features: [
      '60 min classes',
      '12 classes covering 1 Full Term',
      '1st Preference Weekends',
      'Post Lesson Reports',
      'End of Term Report',
      '2 Free reschedules',
    ],
    color: 'platinum-card',
    popular: true,
  },
];

const Package = () => {
  return (
    <>
      <Topheader />
      <div className="package-container">
        <h4 className="mb-4 font-weight-bold">Package</h4>

        <div className="package-grid">
          {packages.map((pkg, index) => (
            <Link to={`/packagedetails/${pkg.type}`} key={index} className="package-link">
              <div className={`package-card ${pkg.color}`}>
                <div className="package-header">
                  <h4>{pkg.type.toUpperCase()}</h4>
                  <span className="class-count">{pkg.classes}</span>
                </div>
                <ul className="feature-list">
                  {pkg.features.map((feature, i) => (
                    <li key={i}>✔ {feature}</li>
                  ))}
                </ul>
                {pkg.popular && <div className="badge">Most Popular</div>}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">Term</button>


      <div className="modal fade" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Terms & conditions</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body" style={{ height: '350px', overflowY: 'auto' }}>
              <p><strong>1 Terms</strong><br/>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>


            </div>
            <div className="modal-footer custom-footer">
  <div className="row w-100">
    <div className="col-6 d-flex justify-content-center">
      <button type="button" className="custom-button" data-dismiss="modal">Decline</button>
    </div>
    <div className="col-6 d-flex justify-content-center">
      <button type="button" className="custom-button">Accept</button>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>

    </>
  );
};

export default Package;
