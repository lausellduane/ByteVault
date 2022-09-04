import React from 'react';
import {Modal, ModalVariant, Button, Form, FormGroup, TextInput, TextArea} from '@patternfly/react-core';
// import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import BasicCodeEditor from '../utils/code_editor';
// import { Language } from '@patternfly/react-code-editor';
import { MultiTypeaheadSelectInput } from '../utils/multi_select';
import { TypeaheadSelectInput } from '../utils/single_select';

export const FragmentModal = (props) => {
  const { isOpen, handleCreatFragmentModalToggle } = props;
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [snippet, setSnippet] = React.useState('');
  const [language, setLanguage] = React.useState({});
  const [tags, setTags] = React.useState([]);

  const handleTitleInputChange = value => {
    setTitle(value);
  };

  const handleDescriptionInputChange = value => {
    setDescription(value);
  };

  const handleNotesInputChange = value => {
    setNotes(value);
  };

  const handleSnippetInputChange = value => {
    setSnippet(value);
  };

  const handleLaguageInputChange = value => {
    setLanguage(value);
  };

  const handleTagsInputChange = value => {
    setTags(value);
  };

  const onCreateFragment = (e) => {
    e.preventDefault();
    const body = {
      "title": title,
      "description": description,
      "notes": notes,
      "value": snippet,
      "tags": tags,
      "language": language?.id
    }
    console.log("body: ", body);

    handleCreatFragmentModalToggle(false);
    handleTitleInputChange('');
    handleDescriptionInputChange('');
    handleNotesInputChange('');
    handleSnippetInputChange('');
    handleLaguageInputChange({});
    handleTagsInputChange([]);
  }

  return <>
      <Modal 
        variant={ModalVariant.small} 
        title="Create Fragment" 
        description="Enter your fragment information below to create a fragment." 
        isOpen={isOpen} 
        onClose={handleCreatFragmentModalToggle} 
        actions={
            [
                <Button 
                    key="create" 
                    variant="primary" 
                    form="modal-with-form-form" 
                    onClick={onCreateFragment}
                >
                    Confirm
                </Button>, 
                <Button 
                    key="cancel" 
                    variant="link" 
                    onClick={handleCreatFragmentModalToggle}
                >
                    Cancel
                </Button>
            ]
        }
      >
        <Form id="modal-with-create-fragment-form">
          <FormGroup 
            label="Title" 
            isRequired 
            fieldId="modal-with-create-fragment-form-title"
          >
            <TextInput 
                isRequired 
                type="text" 
                id="modal-with-form-form-title" 
                name="modal-with-form-form-title" 
                value={title} 
                onChange={handleTitleInputChange} 
            />
          </FormGroup>
          <FormGroup 
            label="Description" 
            isRequired 
            fieldId="modal-with-create-fragment-form-description"
          >
            <TextArea 
                isRequired 
                id="modal-with-form-form-description" 
                name="modal-with-form-form-description" 
                value={description} 
                onChange={handleDescriptionInputChange} 
            />
          </FormGroup>
          <FormGroup 
            label="Notes"
            fieldId="modal-with-create-fragment-form-notes"
          >
            <TextArea
                id="modal-with-form-form-notes" 
                name="modal-with-form-form-notes" 
                value={notes} 
                onChange={handleNotesInputChange} 
              />
          </FormGroup>
          <FormGroup 
            label="Language"
            isRequired
            fieldId="modal-with-create-fragment-form-language"
          >
            <TypeaheadSelectInput
              options={props.programmingLanguages}
              ariaLabel="Select language"
              placeholderText="Select language"
              fieldId="language"
              handleLaguageInputChange={handleLaguageInputChange}
            />
          </FormGroup>
          <FormGroup 
            label="Snippet" 
            isRequired 
            fieldId="modal-with-create-fragment-form-snippet"
          >
            <BasicCodeEditor
                id="modal-with-form-form-snippet"  
                value={snippet} 
                language={language}
                handleSnippetInputChange={handleSnippetInputChange} 
            />
          </FormGroup>
          <FormGroup 
            label="Tags"
            fieldId="modal-with-create-fragment-form-tags"
          >
            <MultiTypeaheadSelectInput 
              options={props.tags}
              ariaLabel="Select tag(s)"
              placeholderText="Select tag(s)"
              handleTagsInputChange={handleTagsInputChange}
            />
          </FormGroup>
        </Form>
      </Modal>
    </>;
};