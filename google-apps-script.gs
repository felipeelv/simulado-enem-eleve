/**
 * Apps Script — Simulado ENEM ELEVE
 * Recebe POST do formulário da landing page e grava em uma aba do Google Sheets.
 *
 * Como usar:
 * 1. Crie um Google Sheets novo (ex.: "Inscrições Simulado ENEM ELEVE")
 * 2. No Sheets, vá em Extensões → Apps Script
 * 3. Apague o conteúdo de Code.gs e cole este arquivo inteiro
 * 4. Salve (Ctrl+S)
 * 5. Clique em Deploy → New deployment
 *    - Type: Web app
 *    - Description: Simulado ENEM ELEVE — Inscrições
 *    - Execute as: Me (felipe.rosa@colegioeleve.com.br)
 *    - Who has access: Anyone
 * 6. Copie a URL do tipo https://script.google.com/macros/s/.../exec
 * 7. Cole essa URL no index.html na constante GOOGLE_SCRIPT_URL
 * 8. Faça um redeploy do site
 *
 * Para atualizar o script no futuro:
 *  - Edite o Apps Script, salve
 *  - Deploy → Manage deployments → editar lapis → New version
 */

const SHEET_NAME = "Inscrições";

const HEADERS = [
  "Data/Hora",
  "Nome",
  "Série",
  "Turma",
  "Carteira",
  "Telefone",
  "E-mail",
  "Observação",
  "Ciente da política de frequência",
  "Ciente dos materiais"
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    sheet.appendRow([
      payload.dataCadastro || new Date().toLocaleString("pt-BR"),
      payload.nome || "",
      payload.serie || "",
      payload.turma || "",
      payload.carteira || "",
      payload.telefone || "",
      payload.email || "",
      payload.observacao || "",
      payload.politicaFrequencia || "",
      payload.cienciaMateriais || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  // Endpoint de saúde — útil pra testar se o deploy está no ar
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: "Simulado ENEM ELEVE" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Garante cabeçalho
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#2D2D2D");
    headerRange.setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, HEADERS.length);
  }

  return sheet;
}
