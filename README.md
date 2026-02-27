# AVEtime - Salon Appointment Booking System

A complete NestJS backend for a salon appointment booking application with multi-location support.

## 🚀 Features

### Core Modules

1. **Countries & Cities** - 20 countries with 400+ cities pre-seeded
2. **Businesses (Salons)** - Multi-location salon management with profiles
3. **Services** - Service categories, pricing, and duration management
4. **Employees** - Role-based access control with schedules
5. **Appointments** - Complete booking workflow with status tracking
6. **Schedules** - Weekly schedules, opening hours, and break times
7. **Users & Authentication** - JWT auth with i18n support (5 languages)
8. **Notifications** - Real-time notifications via WebSocket

## 📦 Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

## 🗄️ Database Setup

### 1. Configure PostgreSQL in .env

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=avetime
DB_SYNC=true
```

### 2. Create Database

```bash
psql -U postgres
CREATE DATABASE avetime;
\q
```

### 3. Seed Database

```bash
# Seed countries, cities, and roles
npm run seed
```

This populates:
- **20 Countries** (US, UK, CA, AU, EU countries, etc.)
- **400+ Cities** across all countries
- **3 Roles**: Owner, Manager, Employee


### 4. Update packages 

```bash
npx npm-check-updates -i -t latest "/^@nestjs\/.*$/"
```


## 🏃 Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Server starts on `http://localhost:3000`

## 📊 Database Schema

**Tables**: users, countries, cities, businesses, roles, employees, services, employee_services, appointments, opening_hours, employee_schedules, employee_breaks

**Key Relationships**:
- Country → Cities → Businesses
- Business → Employees, Services, Opening Hours
- Employee → Appointments, Schedules, Breaks
- Service ↔ Employees (many-to-many)

## 🔐 Role Permissions

- **Owner**: Full access to business, employees, services, appointments, reports, settings
- **Manager**: Manage employees, services, appointments, view reports
- **Employee**: Manage own appointments only

## 🌐 Supported Languages

English, French, German, Italian, Albanian

## 🚀 Next Steps

1. ✅ Database entities & seed data
2. 🔄 Implement service layer logic
3. 🔄 Add authentication guards
4. 🔄 Implement booking availability
5. 🔄 Add search & filtering
6. 🔄 Email notifications
7. 🔄 Payment integration

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
