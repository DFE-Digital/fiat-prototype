FROM node:18-bullseye

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

COPY . .

RUN npm install

COPY overrides/govuk-prototype-kit-authentication.js /app/node_modules/govuk-prototype-kit/lib/authentication.js
COPY overrides/govuk-prototype-kit-plugins-routes.js /app/node_modules/govuk-prototype-kit/lib/plugins/plugins-routes.js

EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["dev"]