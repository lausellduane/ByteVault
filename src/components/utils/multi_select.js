import React from 'react';
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';

export class MultiTypeaheadSelectInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      isOpen: false,
      selected: [],
      isCreatable: false,
      hasOnCreateOption: false,
      hasDisabledOption: false,
      resetOnSelect: true,
      formSelected: [],
    };

    this.onToggle = isOpen => {
      this.setState({
        isOpen
      });
    };

    this.onSelect = (...args) => {
      const [ e, selection ] = args;
      e.preventDefault();
      const { selected } = this.state;
      const { options, handleTagsInputChange } = this.props;
      let formValues = options.filter(item => item.label === selection)[0];

      if (selected.includes(selection)) {
        this.setState(
          prevState => ({ selected: prevState.selected.filter(item => item !== selection), 
            formSelected: prevState.formSelected.filter(item => item.label !== selection) }),
          () => {
            handleTagsInputChange(this.state.formSelected)
          }
        );
        
      } else {
        if(formValues === undefined){
          this.setState(
            prevState => ({ selected: [...prevState.selected, selection],
              formSelected: [...prevState.formSelected, {"id": 0, "label": selection}] }),
            () => {
              handleTagsInputChange(this.state.formSelected)
            }
          );
        } else {
          this.setState(
            prevState => ({ selected: [...prevState.selected, selection],
              formSelected: [...prevState.formSelected, formValues] }),
            () => {
              handleTagsInputChange(this.state.formSelected)
              
            }
          );
        }
      }
    };

    this.clearSelection = () => {
      this.setState({
        selected: [],
        formSelected: [],
        isOpen: false
      });
    };

    this.toggleCreatable = checked => {
      this.setState({
        isCreatable: checked
      });
    };

    this.toggleCreateNew = checked => {
      this.setState({
        hasOnCreateOption: checked
      });
    };

    this.toggleOptionDisabled = toggleIndex => () => {
      this.setState(prevState => ({
        hasDisabledOption: !prevState.hasDisabledOption,
        options: prevState.options.map((option, index) =>
          index === toggleIndex ? { ...option, disabled: !option.disabled } : option
        )
      }));
    };

    this.toggleResetOnSelect = checked => {
      this.setState({
        resetOnSelect: checked
      });
    };
  }

  render() {
    const { isOpen, selected } = this.state;
    const { options: propsOptions, ariaLabel, placeholderText } = this.props;
    const titleId = 'multi-typeahead-select-id-1';

    return (
      <div>
        <span id={titleId} hidden>
          Select tag(s)
        </span>
        <Select
          variant={SelectVariant.typeaheadMulti}
          typeAheadAriaLabel={ariaLabel}
          onToggle={this.onToggle}
          onSelect={this.onSelect}
          onClear={this.clearSelection}
          selections={selected}
          isOpen={isOpen}
          aria-labelledby={titleId}
          placeholderText={placeholderText}
          isCreatable={true}
        >
          {propsOptions.map((option, index) => (
            <SelectOption
              key={index}
              value={option.label}
              {...(option.description && { description: option.description })}
            />
          ))}
        </Select>
      </div>
    );
  }
}