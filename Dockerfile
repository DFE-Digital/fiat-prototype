FROM node:18-bullseye

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

COPY . .

RUN apt-get update && \
    apt-get install ca-certificates -y

# - Install upstream requirements
ADD https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb /usr/share/microsoft.deb
RUN dpkg -i /usr/share/microsoft.deb && \
    rm /usr/share/microsoft.deb && \
    apt-get update && \
    apt-get upgrade -y && \
    ACCEPT_EULA=Y apt-get install -y \
    mssql-tools18 \
    msodbcsql18 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm install

COPY overrides/govuk-prototype-kit-authentication.js /app/node_modules/govuk-prototype-kit/lib/authentication.js
COPY overrides/govuk-prototype-kit-plugins-routes.js /app/node_modules/govuk-prototype-kit/lib/plugins/plugins-routes.js

EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["dev"]