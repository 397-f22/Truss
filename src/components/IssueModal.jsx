import './IssueModal.css';

// https://codebuckets.com/2021/08/08/bootstrap-modal-dialog-in-react-without-jquery/

const IssueModal = ({ children, open, close }) => (
  <div
    className={`modal ${open ? 'modal-show' : ''}`}
    tabIndex="-1"
    role="dialog"
    onClick={(evt) => { if (evt.target === evt.currentTarget) close(); }}
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className='modal-title'>Create Issue</h5>
          <button type="button" className="btn-close" aria-label="Close"
            onClick={close}
          />
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  </div>
);


export default IssueModal