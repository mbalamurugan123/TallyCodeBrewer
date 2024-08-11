import sys
import subprocess
import io

def execute_python_code(code):
    original_stdout = sys.stdout
    sys.stdout = output_capture = io.StringIO()
    try:
        exec(code)
        output = output_capture.getvalue()
        return output
    except Exception as e:
        return str(e)
    finally:
        sys.stdout = original_stdout

def execute_java_code(code):
    try:
        # Write the Java code to Main.java
        with open("Main.java", "w") as f:
            f.write(code)
        
        # Compile the Java code
        compile_process = subprocess.run(["javac", "Main.java"], capture_output=True, text=True)
        
        if compile_process.returncode != 0:
            return compile_process.stderr
        
        # Run the compiled Java class
        run_process = subprocess.run(["java", "Main"], capture_output=True, text=True)
        
        if run_process.returncode != 0:
            return run_process.stderr
        
        return run_process.stdout
    except Exception as e:
        return str(e)

def execute_cpp_code(code):
    try:
        # Write the C++ code to main.cpp
        with open("main.cpp", "w") as f:
            f.write(code)
        
        # Compile the C++ code
        compile_process = subprocess.run(["g++", "main.cpp", "-o", "main"], capture_output=True, text=True)
        
        if compile_process.returncode != 0:
            return compile_process.stderr
        
        # Run the compiled C++ program
        run_process = subprocess.run(["./main"], capture_output=True, text=True)
        
        if run_process.returncode != 0:
            return run_process.stderr
        
        return run_process.stdout
    except Exception as e:
        return str(e)

def handler(event, context):
    code = event.get('code', '')
    language = event.get('language', 'python')
    
    if language == 'python':
        result = execute_python_code(code)
    elif language == 'java':
        result = execute_java_code(code)
    elif language == 'cpp':
        result = execute_cpp_code(code)
    else:
        result = 'Unsupported language: ' + language
    
    return {
        'statusCode': 200,
        'body': result
    }