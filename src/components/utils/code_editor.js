import React, { useState } from 'react';
import { CodeEditor, Language } from '@patternfly/react-code-editor';

export const ByteVaultCodeEditor = (props) => {
  const { isReadOnly, value, handleSnippetInputChange, language } = props;
  const [formattedLanguage, setFormattedLanguage] = useState('');

  const onEditorDidMount = (editor, monaco) => {
    editor.layout();
    editor.focus();
    monaco.editor.getModels()[0].updateOptions({ tabSize: 5 });
    const lang = language?.id === 1 ? Language.javascript : 
        language?.id === 2 ? Language.python :
        language?.id === 3 ? Language.go :
        Language.plaintext
    setFormattedLanguage(lang);
  }

  return (
    <>
      <CodeEditor
        isCopyEnabled  // keep an eye on copy getting cut before escaped characters
        isDownloadEnabled
        isReadOnly={isReadOnly}
        isLanguageLabelVisible={language?.id}
        code={value}
        onChange={handleSnippetInputChange}
        language={formattedLanguage}
        onEditorDidMount={onEditorDidMount}
        height='400px'
      />
    </>
  );
};