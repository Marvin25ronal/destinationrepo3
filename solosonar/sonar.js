const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://sonar-qb-prod.isoft-ste.com/',
        options: {
            'sonar.projectName': 'ejemplo-solucredit',
            'sonar.projectVersion': '1.0.0',
            'sonar.projectDescription': 'Backend test qa nodejs',
            'sonar.sources': '../solucredit-app',
            'sonar.tests': 'test',
            'sonar.login': 'd9618251fc7ab20cb7461e22831ddde5ca2050bc',
            'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
        }
    },
    () => process.exit()
)