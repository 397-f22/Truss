import './ProjectModal.css';

// https://codebuckets.com/2021/08/08/bootstrap-modal-dialog-in-react-without-jquery/

const ProjectModal = ({ children, open, close }) => {
    return (
      <div
        className={`modal ${open ? 'modal-show' : ''}`}
        tabIndex="-1"
        role="dialog"
        onClick={(evt) => { if (evt.target === evt.currentTarget) close(); }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
            <div className="issue-modal-header">Create a New Project</div>
              <button type="button" className="btn-close" aria-label="Close" onClick={close} />
            </div>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ProjectModal;
