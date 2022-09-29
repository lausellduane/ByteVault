import React from 'react';
import {
  Alert,
  Modal, 
  ModalVariant, 
  Button, 
  Form,
  FormAlert,
  FormHelperText, 
  FormGroup,
  Text,
  TextVariants, 
  TextInput, 
  TextArea
} from '@patternfly/react-core';
// import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import { ByteVaultCodeEditor } from '../utils/code_editor';
// import { Language } from '@patternfly/react-code-editor';
import { MultiTypeaheadSelectInput } from '../utils/multi_select';
import { TypeaheadSelectInput } from '../utils/single_select';
import { useFragmentPostMutation } from '../../api/useFragmentsPostEndpoints';

const validatedInitialState = {
  title: "",
  description: "",
  notes: ""
};

export const FragmentModal = (props) => {
  const { isOpen, setIsOpen } = props;
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [snippet, setSnippet] = React.useState('');
  const [language, setLanguage] = React.useState({});
  const [tags, setTags] = React.useState([]);
  const { useCreateFragment } = useFragmentPostMutation();
  const [validated, setValidated] = React.useState(validatedInitialState);
  const [languageValidated, setLanguageValidated] = React.useState("");
  const [tagsValidated, setTagsValidated] = React.useState("");
  const [snippetValidated, setSnippetValidated] = React.useState("");

  const handleTitleInputChange = value => {
    setTitle(value);
    if (value === '') {
      setValidated({ ...validated, title: "default" });
    } else if (value.length < 50) {
      setValidated({ ...validated, title: "success" });
    } else {
      setValidated({ ...validated, title: "error"});
    }
  };

  const handleDescriptionInputChange = value => {
    setDescription(value);
    if (value === '') {
      setValidated({ ...validated, description: "default" });
    } else if (value.length < 250) {
      setValidated({ ...validated, description: "success" });
    } else {
      setValidated({ ...validated, description: "error", });
    }
  };

  const handleNotesInputChange = value => {
    setNotes(value);
    if (value === '') {
      setValidated({ ...validated, notes: "default" });
    } else if (value.length < 250) {
      setValidated({ ...validated, notes: "success" });
    } else {
      setValidated({ ...validated, notes: "error" });
    }
  };

  const handleSnippetInputChange = value => {
    if (value.trim().length !== 0) {
      setSnippet(value);
      setSnippetValidated("success");
    } else {
      setSnippetValidated("default");
    }
  };

  const validateLanguage = value => {
    if (Object.keys(value).length === 0) return false;
    if (value?.label === "") return false;
    return true;
  };

  const handleLanguageInputChange = value => {
    setLanguage(value);
    const isValid = validateLanguage(value)
    if (isValid) {
      setLanguageValidated("success");
    } else {
      setLanguageValidated("default");
    }
  };

  const validateTags = value => {
    if (value.length < 1) return false;
    const validation = value.map(item => item?.label?.trim().length !== 0 ? true : false);
    if (validation.includes(false)) return false;
    return true;
  }

  const handleTagsInputChange = value => {
    setTags(value);
    const isValid = validateTags(value);
    if (isValid) {
      setTagsValidated("success");
    } else {
      setTagsValidated("default");
    }
  };

  const clearInputs = () => {
    handleTitleInputChange('');
    handleDescriptionInputChange('');
    handleNotesInputChange('');
    handleSnippetInputChange('');
    handleLanguageInputChange({});
    handleTagsInputChange([]);
  }

  const onCreateFragment = (e) => {
    e.preventDefault();
    const body = {
      "title": title,
      "description": description,
      "notes": notes,
      "value": snippet,
      "tags": tags,
      "language": language?.id
    };

    useCreateFragment.mutate(body);

    setIsOpen(false);
    clearInputs();
  }

  const handleFormValidation = () => {
    const validations = Object.values(validated).every(value => value === "success");
    const languageValidation = languageValidated === "success" ? true : false;
    const tagsValidation = tagsValidated === "success" ? true : false;
    const snippetValidation = snippetValidated === "success" ? true : false;
    return validations && languageValidation && tagsValidation && snippetValidation;
  }

  return <>
      <Modal 
        variant={ModalVariant.medium} 
        title="Create Fragment" 
        description="Enter your fragment information below to create a fragment. All required fields must be entered before submission." 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        actions={
            [
                <Button 
                    key="create" 
                    variant="primary" 
                    form="modal-with-form-form" 
                    onClick={onCreateFragment}
                    isDisabled={!handleFormValidation()}
                >
                    Confirm
                </Button>, 
                <Button 
                    key="cancel" 
                    variant="link" 
                    onClick={() => setIsOpen(false)}
                >
                    Cancel
                </Button>
            ]
        }
      >
        <Form id="modal-with-create-fragment-form">
          {
            !handleFormValidation() && 
              <FormAlert>
                <Alert variant="danger" title="Fill out all required fields before continuing." aria-live="polite" isInline />
              </FormAlert>
          }
          <div className="pf-l-grid pf-m-gutter">
            <FormGroup 
              label="Title" 
              isRequired 
              fieldId="modal-with-create-fragment-form-title"
              helperText={
                <FormHelperText 
                  icon={<ExclamationCircleIcon />} 
                  isHidden={validated.title !== 'default'}
                >
                  Please enter a title
                </FormHelperText>
              }
              helperTextInvalid="Must be a string (50 characters max)" helperTextInvalidIcon={<ExclamationCircleIcon />}
              validated={validated.title}
            >
              <TextInput 
                  isRequired 
                  type="text" 
                  id="modal-with-form-form-title" 
                  name="modal-with-form-form-title" 
                  value={title} 
                  onChange={handleTitleInputChange}
                  validated={validated.title}
              />
            </FormGroup>
            <div className="pf-l-grid__item pf-m-6-col">
              <FormGroup 
                label="Description" 
                isRequired 
                fieldId="modal-with-create-fragment-form-description"
                helperText={
                  <FormHelperText 
                    icon={<ExclamationCircleIcon />} 
                    isHidden={validated.description !== 'default'}
                  >
                    Please enter a description
                  </FormHelperText>
                }
                helperTextInvalid="Must be a string (250 characters max)" helperTextInvalidIcon={<ExclamationCircleIcon />}
                validated={validated.description}
              >
                <TextArea 
                    isRequired 
                    id="modal-with-form-form-description" 
                    name="modal-with-form-form-description" 
                    value={description} 
                    onChange={handleDescriptionInputChange}
                    validated={validated.description}
                />
              </FormGroup>
            </div>
            <div className="pf-l-grid__item pf-m-6-col">
              <FormGroup 
                label="Notes"
                fieldId="modal-with-create-fragment-form-notes"
                helperText={
                  <FormHelperText 
                    icon={<ExclamationCircleIcon />} 
                    isHidden={validated.notes !== 'default'}
                  >
                    Please enter notes
                  </FormHelperText>
                }
                helperTextInvalid="Must be a string (250 characters max)" helperTextInvalidIcon={<ExclamationCircleIcon />}
                validated={validated.notes}
              >
                <TextArea
                    id="modal-with-form-form-notes" 
                    name="modal-with-form-form-notes" 
                    value={notes} 
                    onChange={handleNotesInputChange}
                    validated={validated.notes}
                  />
              </FormGroup>
            </div>
            <div className="pf-l-grid__item pf-m-6-col">
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
                  handleLanguageInputChange={handleLanguageInputChange}
                  validated={languageValidated}
                />
                {languageValidated !== "success" 
                  && <FormHelperText 
                      icon={<ExclamationCircleIcon />} 
                      isHidden={languageValidated !== "default"}
                    >
                      Please select language
                    </FormHelperText>
                }
              </FormGroup>
            </div>
            <div className="pf-l-grid__item pf-m-6-col">
              <FormGroup 
                label="Tags"
                isRequired
                fieldId="modal-with-create-fragment-form-tags"
              >
                <MultiTypeaheadSelectInput 
                  options={props.tags}
                  ariaLabel="Select tag(s)"
                  placeholderText="Select tag(s)"
                  handleTagsInputChange={handleTagsInputChange}
                  validated={tagsValidated}
                />
              </FormGroup>
              {tagsValidated !== "success" 
                  && <FormHelperText 
                      icon={<ExclamationCircleIcon />} 
                      isHidden={tagsValidated !== "default"}
                    >
                      Please select tag(s)
                    </FormHelperText>
                }
            </div>
            <FormGroup 
              label="Snippet" 
              isRequired 
              fieldId="modal-with-create-fragment-form-snippet"
            >
              <ByteVaultCodeEditor
                  id="modal-with-form-form-snippet"  
                  value={snippet} 
                  language={language}
                  handleSnippetInputChange={handleSnippetInputChange} 
              />
              {snippetValidated !== "success" 
                  && <FormHelperText 
                      icon={<ExclamationCircleIcon />} 
                      isHidden={snippetValidated !== "default"}
                    >
                      Please enter code
                    </FormHelperText>
                }
            </FormGroup>
          </div>
        </Form>
      </Modal>
    </>;
};