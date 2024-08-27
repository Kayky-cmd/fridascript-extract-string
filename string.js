Java.perform(function () {
    var categories = {
        "wallet": [],
        "token": [],
        "api": [],
        "apikey": [],
        "payment": []
    };
    function getCategory(name) {
        for (var term in categories) {
            if (name.toLowerCase().includes(term)) {
                return term;
            }
        }
        return null;
    }
    Java.enumerateLoadedClasses({
        onMatch: function(className) {
            var category = getCategory(className);
            if (category) {
                console.log("[*] " + category.charAt(0).toUpperCase() + category.slice(1) + " Classe encontrada: " + className);
                categories[category].push(className);
                try {
                    var clazz = Java.use(className);
                    var methods = clazz.class.getDeclaredMethods();
                    methods.forEach(function(method) {
                        var methodName = method.toString();
                        if (getCategory(methodName)) {
                            console.log("  [*] Importante Método: " + methodName);
                        }
                    });
                } catch (e) {
                    console.log("  [!] Erro ao inspecionar a classe: " + className + " - " + e.message);
                }
            }
        },
        onComplete: function() {
            console.log("[*] Finalizada a enumeração de classes.");
            console.log("[*] Resumo das Classes Encontradas:");

            for (var term in categories) {
                if (categories[term].length > 0) {
                    console.log("\n[*] " + term.charAt(0).toUpperCase() + term.slice(1) + " Classes:");
                    categories[term].forEach(function(className) {
                        console.log("  - " + className);
                    });
                }
            }
        }
    });
});
