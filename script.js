function calcularRescisao() {
    const dataEntrada = new Date(document.getElementById("dataEntrada").value);
    const dataSaida = new Date(document.getElementById("dataSaida").value);
    const numeroFilhos = parseInt(document.getElementById("numeroFilhos").value);
    const salario = parseFloat(document.getElementById("salario").value);
    const tipoDispensa = document.getElementById("tipoDispensa").value;
    const feriasTiradas = document.getElementById("feriasTiradas").value;
    const valeTransporte = parseFloat(document.getElementById("valeTransporte").value || 0);
    const valeAlimentacao = parseFloat(document.getElementById("valeAlimentacao").value || 0);

    // Cálculo de rescisão
    let avisoPrevio = 0;
    let decimoTerceiro = 0;
    let feriasProporcionais = 0;
    let descontoValeTransporte = valeTransporte * 0.06;

    const mesesTrabalhados = (dataSaida.getFullYear() - dataEntrada.getFullYear()) * 12 +
                             (dataSaida.getMonth() - dataEntrada.getMonth());

    if (tipoDispensa === "semJustaCausa") {
        avisoPrevio = salario;
        decimoTerceiro = (salario / 12) * mesesTrabalhados;
        feriasProporcionais = (salario / 12) * mesesTrabalhados;
    } else if (tipoDispensa === "pedidoDemissao") {
        decimoTerceiro = (salario / 12) * mesesTrabalhados;
        feriasProporcionais = (salario / 12) * mesesTrabalhados;
    }

    const totalRescisao = avisoPrevio + decimoTerceiro + feriasProporcionais - descontoValeTransporte + valeAlimentacao;

    document.getElementById("resultado").innerHTML = `
        <h2>Resultado da Rescisão</h2>
        <p>Valor de Aviso Prévio: R$ ${avisoPrevio.toFixed(2)}</p>
        <p>Décimo Terceiro Proporcional: R$ ${decimoTerceiro.toFixed(2)}</p>
        <p>Férias Proporcionais: R$ ${feriasProporcionais.toFixed(2)}</p>
        <p>Desconto Vale Transporte (6%): R$ ${descontoValeTransporte.toFixed(2)}</p>
        <p>Total Rescisão: R$ ${totalRescisao.toFixed(2)}</p>
    `;
}

function compartilhar() {
    const resultado = document.getElementById("resultado").innerText;
    if (navigator.share) {
        navigator.share({
            title: 'Cálculo de Rescisão Trabalhista',
            text: resultado,
        }).then(() => console.log("Compartilhamento bem-sucedido"))
        .catch(error => console.error("Erro ao compartilhar", error));
    } else {
        alert("Compartilhamento não suportado neste navegador.");
    }
}
