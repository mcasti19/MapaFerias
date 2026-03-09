/**
 * PDF Export utility for Planificación and Cumplimiento tables.
 * Uses jspdf + jspdf-autotable.
 */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PdfOptions {
    title: string;
    subtitle: string;
    headers: string[];
    rows: (string | number)[][];
    totalsRow?: (string | number)[];
    fileName: string;
}

export function exportTableToPdf({ title, subtitle, headers, rows, totalsRow, fileName }: PdfOptions) {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    // Brand colors
    const primaryColor: [ number, number, number ] = [ 185, 28, 28 ]; // Mercal red
    const darkColor: [ number, number, number ] = [ 30, 41, 59 ];

    // Header bar
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 297, 28, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), 14, 12);

    // Subtitle
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(subtitle, 14, 20);

    // Logo text
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('MERCAL', 270, 16);

    // Table
    const body = [ ...rows ];
    if (totalsRow) {
        body.push(totalsRow);
    }

    autoTable(doc, {
        startY: 34,
        head: [ headers ],
        body: body,
        theme: 'grid',
        headStyles: {
            fillColor: darkColor,
            textColor: [ 255, 255, 255 ],
            fontStyle: 'bold',
            fontSize: 7,
            halign: 'center',
            valign: 'middle',
            cellPadding: 2,
        },
        bodyStyles: {
            fontSize: 7,
            halign: 'center',
            cellPadding: 1.5,
            textColor: [ 30, 41, 59 ],
        },
        columnStyles: {
            0: { halign: 'left', fontStyle: 'bold', cellWidth: 30 },
        },
        alternateRowStyles: {
            fillColor: [ 248, 250, 252 ],
        },
        didParseCell: (data) => {
            // Highlight totals row
            if (totalsRow && data.row.index === rows.length) {
                data.cell.styles.fillColor = darkColor;
                data.cell.styles.textColor = [ 255, 255, 255 ];
                data.cell.styles.fontStyle = 'bold';
                data.cell.styles.fontSize = 8;
            }
        },
        margin: { top: 34, left: 10, right: 10 },
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(150);
        const pageHeight = (doc as any).internal.pageSize.height || (doc as any).internal.pageSize.getHeight();
        doc.text(
            `Generado el ${new Date().toLocaleDateString('es-VE')} - Página ${i} de ${pageCount}`,
            148,
            pageHeight - 6,
            { align: 'center' }
        );
    }

    doc.save(fileName);
}
