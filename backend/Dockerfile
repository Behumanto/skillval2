FROM python:3.11-slim

WORKDIR /app

COPY pyproject.toml setup.cfg ./
COPY app ./app

RUN pip install --upgrade pip && pip install -e .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
