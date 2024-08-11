import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Editor } from '@monaco-editor/react';

function App() {
    
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python'); // Default to Python
    const [response, setResponse] = useState(null);

    const gcdata = (data) => {
        return axios.post(`http://localhost:9000/2015-03-31/functions/function/invocations`, data);
    };

    const submitCode = async () => {
        const payload = {
            language: language,
            code: code,
        };

        try {
            const res = await gcdata(payload);
            setResponse(res.data);
            console.log(res.data);
        } catch (error) {
            console.error('Error during submission:', error);
        }
    };

    return (
        <div>
            <button 
                style={{ background: language === "python" ? "black" : "white", color: language === "python" ? "white" : "black" }} 
                onClick={() => setLanguage("python")}
            >
                Python
            </button>
            <button 
                style={{ background: language === "java" ? "black" : "white", color: language === "java" ? "white" : "black" }} 
                onClick={() => setLanguage("java")}
            >
                Java
            </button>
            <button 
                style={{ background: language === "cpp" ? "black" : "white", color: language === "cpp" ? "white" : "black" }} 
                onClick={() => setLanguage("cpp")}
            >
                Cpp
            </button>
            <button 
                style={{ background: 'green', color: 'white' }} 
                onClick={submitCode}
            >
                Submit
            </button>
            <Editor
                onChange={setCode}
                value={code}
                theme='vs-dark'
                height="90vh"
                language={language}
                defaultValue="// Write your code here..."
            />
            {response && (
                <div className="response">
                    <h3>Response from Server:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
