import React from 'react';
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import { Checkbox } from '@patternfly/react-core';

export default class BasicCodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkTheme: false,
      isLineNumbersVisible: true,
      isReadOnly: false,
      isMinimapVisible: true,
      language: props.language === 1 ? Language.javascript : 
                props.language === 2 ? Language.python :
                props.language === 3 ? Language.go :
                Language.plaintext
    };
    
    this.toggleDarkTheme = checked => {
      this.setState({
        isDarkTheme: checked
      });
    };
    this.toggleLineNumbers = checked => {
      this.setState({
        isLineNumbersVisible: checked
      });
    };
    this.toggleReadOnly = checked => {
      this.setState({
        isReadOnly: checked
      });
    };
    this.toggleMinimap = checked => {
      this.setState({
        isMinimapVisible: checked
      })
    };
    
    this.onEditorDidMount = (editor, monaco) => {
      // console.log(editor.getValue());
      editor.layout();
      editor.focus();
      monaco.editor.getModels()[0].updateOptions({ tabSize: 5 });
    };
    
    this.onChange = value => {
      console.log(value);
    };
  }
  
  render() {
    const { isDarkTheme, isLineNumbersVisible, isReadOnly, isMinimapVisible, language } = this.state;
    const { value } = this.props;
    return (
      <>
        <Checkbox
          label="Dark theme"
          isChecked={isDarkTheme}
          onChange={this.toggleDarkTheme}
          aria-label="dark theme checkbox"
          id="toggle-theme"
          name="toggle-theme"
        />
        <Checkbox
          label="Line numbers"
          isChecked={isLineNumbersVisible}
          onChange={this.toggleLineNumbers}
          aria-label="line numbers checkbox"
          id="toggle-line-numbers"
          name="toggle-line-numbers"
        />
        <Checkbox
          label="Read only"
          isChecked={isReadOnly}
          onChange={this.toggleReadOnly}
          aria-label="read only checkbox"
          id="toggle-read-only"
          name="toggle-read-only"
        />
        <Checkbox
          label="Display Minimap"
          isChecked={isMinimapVisible}
          onChange={this.toggleMinimap}
          aria-label="display minimap checkbox"
          id="toggle-minimap"
          name="toggle-minimap"
        />
        <CodeEditor
          // isCopyEnabled  // copy cuts before escaped characters
          isDownloadEnabled
          isDarkTheme={isDarkTheme}
          isLineNumbersVisible={isLineNumbersVisible}
          isReadOnly={isReadOnly}
          isMinimapVisible={isMinimapVisible}
          isLanguageLabelVisible
          code={value}
          onChange={this.onChange}
          language={language}
          onEditorDidMount={this.onEditorDidMount}
          height='400px'
        />
      </>
    );
  }
}