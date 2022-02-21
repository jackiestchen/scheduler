import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const confirmMessage = "Are you sure you would like to delete?";
  const errorSavingMessage = "Oops! An error has occured in saving.";
  const errorDeletingMessage = "Oops! An error has occured in deleting.";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer, isEdit) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview, isEdit)
      .then(() => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true));
  };

  const onDelete = (id) => {
    transition(DELETING, true);

    props
      .cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === ERROR_SAVE && (
        <Error message={errorSavingMessage} onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={errorDeletingMessage} onClose={() => back()} />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={confirmMessage}
          onCancel={() => transition(SHOW)}
          onConfirm={() => onDelete(props.id)}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          value={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(SHOW)}
        />
      )}
    </article>
  );
}
