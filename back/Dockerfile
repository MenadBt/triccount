FROM tiangolo/uvicorn-gunicorn:python3.9

WORKDIR /app

COPY src /src
COPY requirements.txt .


RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
