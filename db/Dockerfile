FROM postgres:17.5

WORKDIR /root

RUN apt-get update
RUN apt-get install -y wget

ARG DATABASE_ENV
RUN wget https://github.com/pksunkara/pgx_ulid/releases/download/v0.2.0/pgx_ulid-v0.2.0-pg17-${DATABASE_ENV}-linux-gnu.deb
RUN dpkg -i pgx_ulid-v0.2.0-pg17-${DATABASE_ENV}-linux-gnu.deb

CMD ["postgres"]