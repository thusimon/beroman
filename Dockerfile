FROM python:3.11.1-alpine
WORKDIR /beroman

COPY requirements.txt ./

RUN pip3 install -r requirements.txt

COPY frontend/build/ ./frontend/build/
COPY server/ ./server/
COPY app.py ./
COPY .env ./

ENTRYPOINT [ "python" ]
CMD [ "-m" , "flask", "run"]
