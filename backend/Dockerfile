FROM eclipse-temurin:17-jdk-alpine AS build

COPY mvnw ./
COPY .mvn .mvn
COPY pom.xml ./

COPY main main

RUN --mount=type=cache,target=/root/.m2,sharing=locked \
    ./mvnw -B -nsu dependency:go-offline

RUN --mount=type=cache,target=/root/.m2,sharing=locked \
    ./mvnw clean package

FROM quay.io/wildfly/wildfly:40.0.1.Final-jdk17

USER root
RUN mkdir -p /opt/jboss/wildfly/modules/org/postgresql/main/
ADD https://jdbc.postgresql.org/download/postgresql-42.7.3.jar /opt/jboss/wildfly/modules/org/postgresql/main/postgresql.jar
COPY ./postgresql-module.xml /opt/jboss/wildfly/modules/org/postgresql/main/module.xml
RUN chown -R jboss:jboss /opt/jboss/wildfly/modules/org

USER jboss
COPY ./standalone.xml /opt/jboss/wildfly/standalone/configuration/standalone.xml 
COPY --from=build --chown=jboss:jboss main/target/main-1.0.0.war /opt/jboss/wildfly/standalone/deployments/ROOT.war

EXPOSE 8080 8080