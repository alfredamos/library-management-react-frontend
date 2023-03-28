interface DeleteItemProp {
  deleteTitle: string;
  deleteMessage: string;
  cancelButton: string;
  submitButton: string;
  deleteItem: (value: boolean) => void;
}

export const DeleteItem = (deleteItemProp: DeleteItemProp) => {
  const { deleteTitle, deleteMessage, deleteItem, cancelButton, submitButton } =
    deleteItemProp;

  let tabIndex = -1;

  return (
    <div
      className="modal fade show d-block mt-5 mt-5"
      id="exampleModal"
      role="dialog"
      tabIndex={tabIndex}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {deleteTitle}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => deleteItem(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{deleteMessage}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => deleteItem(false)}
            >
              {cancelButton}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteItem(true)}
            >
              {submitButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
