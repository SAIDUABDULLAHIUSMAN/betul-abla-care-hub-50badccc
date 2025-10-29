import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

interface OrphanData {
  full_name: string;
  age: number | null;
  location: string | null;
  school_name: string | null;
  grade_level: string | null;
  school_fees_covered: boolean | null;
  status: string | null;
}

interface BoreholeData {
  community_name: string;
  location: string;
  depth_meters: number | null;
  completion_date: string | null;
  beneficiaries_count: number | null;
  status: string | null;
}

interface OutreachData {
  title: string;
  activity_type: string;
  date: string;
  location: string;
  beneficiaries_count: number | null;
  status: string | null;
}

export const generateOrphansReport = (orphans: OrphanData[]) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(34, 139, 34); // Hope color
  doc.text("Orphans Support Report", 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${format(new Date(), "MMMM dd, yyyy")}`, 14, 28);
  
  // Summary statistics
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("Summary", 14, 40);
  
  const totalOrphans = orphans.length;
  const sponsored = orphans.filter(o => o.school_fees_covered).length;
  const active = orphans.filter(o => o.status === "active").length;
  
  doc.setFontSize(10);
  doc.text(`Total Children: ${totalOrphans}`, 14, 48);
  doc.text(`Sponsored: ${sponsored}`, 14, 54);
  doc.text(`Active Cases: ${active}`, 14, 60);
  
  // Table
  autoTable(doc, {
    startY: 70,
    head: [['Name', 'Age', 'Location', 'School', 'Grade', 'Sponsored', 'Status']],
    body: orphans.map(orphan => [
      orphan.full_name,
      orphan.age?.toString() || 'N/A',
      orphan.location || 'N/A',
      orphan.school_name || 'N/A',
      orphan.grade_level || 'N/A',
      orphan.school_fees_covered ? 'Yes' : 'No',
      orphan.status || 'N/A'
    ]),
    headStyles: { fillColor: [34, 139, 34] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { top: 70 },
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  doc.save(`orphans-report-${format(new Date(), "yyyy-MM-dd")}.pdf`);
};

export const generateBoreholesReport = (boreholes: BoreholeData[]) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(52, 152, 219); // Primary color
  doc.text("Water Borehole Projects Report", 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${format(new Date(), "MMMM dd, yyyy")}`, 14, 28);
  
  // Summary statistics
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("Summary", 14, 40);
  
  const totalProjects = boreholes.length;
  const completed = boreholes.filter(b => b.status === "completed").length;
  const totalBeneficiaries = boreholes.reduce((sum, b) => sum + (b.beneficiaries_count || 0), 0);
  
  doc.setFontSize(10);
  doc.text(`Total Projects: ${totalProjects}`, 14, 48);
  doc.text(`Completed: ${completed}`, 14, 54);
  doc.text(`Total Beneficiaries: ${totalBeneficiaries.toLocaleString()}`, 14, 60);
  
  // Table
  autoTable(doc, {
    startY: 70,
    head: [['Community', 'Location', 'Depth (m)', 'Beneficiaries', 'Completion Date', 'Status']],
    body: boreholes.map(borehole => [
      borehole.community_name,
      borehole.location,
      borehole.depth_meters?.toString() || 'N/A',
      borehole.beneficiaries_count?.toLocaleString() || 'N/A',
      borehole.completion_date ? format(new Date(borehole.completion_date), "MMM yyyy") : 'N/A',
      borehole.status || 'N/A'
    ]),
    headStyles: { fillColor: [52, 152, 219] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { top: 70 },
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  doc.save(`boreholes-report-${format(new Date(), "yyyy-MM-dd")}.pdf`);
};

export const generateOutreachReport = (activities: OutreachData[]) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(22, 160, 133); // Accent color
  doc.text("Community Outreach Activities Report", 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${format(new Date(), "MMMM dd, yyyy")}`, 14, 28);
  
  // Summary statistics
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("Summary", 14, 40);
  
  const totalActivities = activities.length;
  const totalBeneficiaries = activities.reduce((sum, a) => sum + (a.beneficiaries_count || 0), 0);
  const activityTypes = new Set(activities.map(a => a.activity_type)).size;
  
  doc.setFontSize(10);
  doc.text(`Total Activities: ${totalActivities}`, 14, 48);
  doc.text(`Total Beneficiaries: ${totalBeneficiaries.toLocaleString()}`, 14, 54);
  doc.text(`Activity Types: ${activityTypes}`, 14, 60);
  
  // Table
  autoTable(doc, {
    startY: 70,
    head: [['Title', 'Type', 'Date', 'Location', 'Beneficiaries', 'Status']],
    body: activities.map(activity => [
      activity.title,
      activity.activity_type,
      format(new Date(activity.date), "MMM dd, yyyy"),
      activity.location,
      activity.beneficiaries_count?.toLocaleString() || 'N/A',
      activity.status || 'N/A'
    ]),
    headStyles: { fillColor: [22, 160, 133] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { top: 70 },
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  doc.save(`outreach-report-${format(new Date(), "yyyy-MM-dd")}.pdf`);
};

export const generateComprehensiveReport = (
  orphans: OrphanData[],
  boreholes: BoreholeData[],
  activities: OutreachData[]
) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(22);
  doc.setTextColor(52, 152, 219);
  doc.text("Comprehensive Activity Report", 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${format(new Date(), "MMMM dd, yyyy")}`, 14, 28);
  
  // Executive Summary
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text("Executive Summary", 14, 42);
  
  doc.setFontSize(10);
  let yPos = 52;
  
  // Orphans Summary
  doc.setFont(undefined, 'bold');
  doc.text("Orphans Support Program", 14, yPos);
  doc.setFont(undefined, 'normal');
  yPos += 6;
  doc.text(`• Total Children: ${orphans.length}`, 20, yPos);
  yPos += 5;
  doc.text(`• Sponsored: ${orphans.filter(o => o.school_fees_covered).length}`, 20, yPos);
  yPos += 5;
  doc.text(`• Active Cases: ${orphans.filter(o => o.status === "active").length}`, 20, yPos);
  yPos += 10;
  
  // Boreholes Summary
  doc.setFont(undefined, 'bold');
  doc.text("Water Borehole Projects", 14, yPos);
  doc.setFont(undefined, 'normal');
  yPos += 6;
  doc.text(`• Total Projects: ${boreholes.length}`, 20, yPos);
  yPos += 5;
  doc.text(`• Completed: ${boreholes.filter(b => b.status === "completed").length}`, 20, yPos);
  yPos += 5;
  const boreholeBeneficiaries = boreholes.reduce((sum, b) => sum + (b.beneficiaries_count || 0), 0);
  doc.text(`• Beneficiaries: ${boreholeBeneficiaries.toLocaleString()}`, 20, yPos);
  yPos += 10;
  
  // Outreach Summary
  doc.setFont(undefined, 'bold');
  doc.text("Community Outreach", 14, yPos);
  doc.setFont(undefined, 'normal');
  yPos += 6;
  doc.text(`• Total Activities: ${activities.length}`, 20, yPos);
  yPos += 5;
  const outreachBeneficiaries = activities.reduce((sum, a) => sum + (a.beneficiaries_count || 0), 0);
  doc.text(`• Beneficiaries: ${outreachBeneficiaries.toLocaleString()}`, 20, yPos);
  yPos += 5;
  doc.text(`• Activity Types: ${new Set(activities.map(a => a.activity_type)).size}`, 20, yPos);
  
  // Overall Impact
  doc.addPage();
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text("Overall Impact", 14, 20);
  
  const totalBeneficiaries = boreholeBeneficiaries + outreachBeneficiaries + orphans.length;
  
  doc.setFontSize(12);
  doc.text(`Total Lives Impacted: ${totalBeneficiaries.toLocaleString()}`, 14, 32);
  
  // Detailed tables on subsequent pages
  if (orphans.length > 0) {
    doc.addPage();
    doc.setFontSize(14);
    doc.text("Orphans Details", 14, 20);
    
    autoTable(doc, {
      startY: 30,
      head: [['Name', 'Age', 'School', 'Grade', 'Sponsored']],
      body: orphans.slice(0, 20).map(o => [
        o.full_name,
        o.age?.toString() || 'N/A',
        o.school_name || 'N/A',
        o.grade_level || 'N/A',
        o.school_fees_covered ? 'Yes' : 'No'
      ]),
      headStyles: { fillColor: [34, 139, 34] },
    });
  }
  
  if (boreholes.length > 0) {
    doc.addPage();
    doc.setFontSize(14);
    doc.text("Borehole Projects Details", 14, 20);
    
    autoTable(doc, {
      startY: 30,
      head: [['Community', 'Location', 'Beneficiaries', 'Status']],
      body: boreholes.map(b => [
        b.community_name,
        b.location,
        b.beneficiaries_count?.toLocaleString() || 'N/A',
        b.status || 'N/A'
      ]),
      headStyles: { fillColor: [52, 152, 219] },
    });
  }
  
  if (activities.length > 0) {
    doc.addPage();
    doc.setFontSize(14);
    doc.text("Outreach Activities Details", 14, 20);
    
    autoTable(doc, {
      startY: 30,
      head: [['Title', 'Type', 'Date', 'Beneficiaries']],
      body: activities.slice(0, 20).map(a => [
        a.title,
        a.activity_type,
        format(new Date(a.date), "MMM dd, yyyy"),
        a.beneficiaries_count?.toLocaleString() || 'N/A'
      ]),
      headStyles: { fillColor: [22, 160, 133] },
    });
  }
  
  // Footer on all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  doc.save(`comprehensive-report-${format(new Date(), "yyyy-MM-dd")}.pdf`);
};
