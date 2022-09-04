import React from 'react';
import { CodeEditor, Language } from '@patternfly/react-code-editor';

export default class BasicCodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkTheme: false,
      isLineNumbersVisible: true,
      isReadOnly: false,
      isMinimapVisible: true,
      language: props.language?.id === 1 ? Language.javascript : 
                props.language?.id === 2 ? Language.python :
                props.language?.id === 3 ? Language.go :
                Language.plaintext
    };
    
    this.toggleReadOnly = checked => {
      this.setState({
        isReadOnly: checked
      });
    };
    
    this.onEditorDidMount = (editor, monaco) => {
      editor.layout();
      editor.focus();
      monaco.editor.getModels()[0].updateOptions({ tabSize: 5 });
    };
  }
  
  render() {
    const { isDarkTheme, isLineNumbersVisible, isReadOnly, isMinimapVisible, language } = this.state;
    const { value, handleSnippetInputChange } = this.props;
    
    return (
      <>
        <CodeEditor
          isCopyEnabled  // keep an eye on copy getting cut before escaped characters
          isDownloadEnabled
          isDarkTheme={isDarkTheme}
          isLineNumbersVisible={isLineNumbersVisible}
          isReadOnly={isReadOnly}
          isMinimapVisible={isMinimapVisible}
          isLanguageLabelVisible={language?.id}
          code={value}
          onChange={handleSnippetInputChange}
          language={language}
          onEditorDidMount={this.onEditorDidMount}
          height='400px'
        />
      </>
    );
  }
}