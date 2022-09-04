import React from 'react';
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';

export class TypeaheadSelectInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: props.options,
      isOpen: false,
      selected: null,
      isDisabled: false,
      isCreatable: false,
      isInputValuePersisted: false,
      isInputFilterPersisted: false,
      hasOnCreateOption: false,
      resetOnSelect: true,
      formSelected: {},
    };

    this.onToggle = isOpen => {
      this.setState({
        isOpen
      });
    };

    this.onSelect = (event, selection, isPlaceholder) => {
      const { options } = this.props;
      const existing = options.filter(item => item.label === selection);
      if (isPlaceholder) this.clearSelection();
      else {
        if (existing.length > 0){
          this.setState({ 
            selected: selection,
            formSelected: existing[0],
            isOpen: this.state.resetOnSelect ? false : this.state.isOpen
          });
          props.handleLaguageInputChange(existing[0]);
        } 
        else {
          this.setState({
            selected: selection,
            formSelected: {"id": 0, "label": selection},
            isOpen: this.state.resetOnSelect ? false : this.state.isOpen
          });
          props.handleLaguageInputChange({"id": 0, "label": selection});
        }
      }
    };

    this.onCreateOption = newValue => {
      this.setState({
        options: [...this.state.options, { id: 0, label: newValue }]
      });
    };

    this.clearSelection = () => {
      this.setState({
        selected: null,
        isOpen: false,
        options: props.options
      });
    };
  }

  render() {
    const {
      isOpen,
      selected,
      hasOnCreateOption,
    } = this.state;
    const { options, fieldId, ariaLabel, placeholderText } = this.props;
    const titleId = `typeahead-select-id-1-${fieldId}`;

    return (
      <div>
        <span id={titleId} hidden>
          {`Select a ${fieldId}`}
        </span>
        <Select
          variant={SelectVariant.typeahead}
          typeAheadAriaLabel={ariaLabel}
          onToggle={this.onToggle}
          onSelect={this.onSelect}
          onClear={this.clearSelection}
          selections={selected}
          isOpen={isOpen}
          aria-labelledby={titleId}
          isInputValuePersisted={true}
          placeholderText={placeholderText}
          isCreatable={true}
          onCreateOption={(hasOnCreateOption && this.onCreateOption) || undefined}
        >
          {options.map((option, index) => (
            <SelectOption
              key={index}
              value={option.label}
            />
          ))}
        </Select>
      </div>
    );
  }
}