const scanner=require('sonarqube-scanner');
scanner(
    {
        serverUrl : 'http://sonar-qb-prod.isoft-ste.com/',
        options:{
            'sonar.projectName': 'solucredit-app',
            'sonar.projectVersion': '1.0.0',
            'sonar.projectDescription': 'sonar solucredit frontend nodejs',
            'sonar.sources': 'src',
            'sonar.login': '1b1420538175ce78aab534359015eda737c0edf8',
        }
    }
)