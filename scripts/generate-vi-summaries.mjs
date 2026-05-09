import fs from 'node:fs';
import path from 'node:path';

const docsRoot = path.resolve('src/content/docs');
const viRoot = path.join(docsRoot, 'vi');

const replacements = [
  ['Architecture', 'Kiến trúc'],
  ['Phase State Machine', 'Máy trạng thái phase'],
  ['State Machine', 'Máy trạng thái'],
  ['Player Controller', 'Bộ điều khiển người chơi'],
  ['Soul Data Repository', 'Kho dữ liệu linh hồn'],
  ['Repository Pattern', 'Mẫu repository'],
  ['Coding Standards', 'Quy chuẩn code'],
  ['Scene Folder Structure', 'Cấu trúc thư mục scene'],
  ['Night Survival Run', 'Chạy sinh tồn ban đêm'],
  ['Day/Night Camera Transition', 'Chuyển camera ngày/đêm'],
  ['Day Night Camera Transition', 'Chuyển camera ngày/đêm'],
  ['MainMenu UX Specification', 'Đặc tả UX menu chính'],
  ['Visual Design Specification', 'Đặc tả thiết kế hình ảnh'],
  ['Asset Specs', 'Đặc tả asset'],
  ['Asset Standards', 'Tiêu chuẩn asset'],
  ['Art Brief', 'Brief mỹ thuật'],
  ['Art Bible', 'Art Bible'],
  ['Systems Index', 'Chỉ mục hệ thống'],
  ['Game Concept', 'Ý tưởng game'],
  ['Game State', 'Trạng thái game'],
  ['NPC/Soul Data Model', 'Mô hình dữ liệu NPC/linh hồn'],
  ['Map & Spawn Director', 'Điều phối map và spawn'],
  ['Map and Spawn Director', 'Điều phối map và spawn'],
  ['Health/Stamina', 'Máu/thể lực'],
  ['Damage Rules', 'Luật sát thương'],
  ['Shadow Spatial Management', 'Quản lý không gian bóng'],
  ['Shrine Objective', 'Mục tiêu miếu'],
  ['Win/Lose Rules', 'Luật thắng/thua'],
  ['Sensory Feedback System', 'Hệ thống phản hồi giác quan'],
  ['Tactile Rituals', 'Nghi lễ xúc giác'],
  ['Consequence Resolver', 'Bộ xử lý hậu quả'],
  ['Curse Effect Modules', 'Module hiệu ứng nguyền rủa'],
  ['Boss Cá Ông Searchlight', 'Đèn quét boss Cá Ông'],
  ['Ward Timer', 'Bộ đếm ward'],
  ['Audio State Director', 'Điều phối trạng thái âm thanh'],
  ['HUD-less Design', 'Thiết kế ít HUD'],
  ['Physical Crowding & Push', 'Chen lấn vật lý và đẩy'],
  ['Physical Crowding and Push', 'Chen lấn vật lý và đẩy'],
  ['Production', 'Sản xuất'],
  ['Epic:', 'Epic:'],
  ['Story', 'Story'],
  ['Overview', 'Tổng quan'],
  ['Status', 'Trạng thái'],
  ['Context', 'Bối cảnh'],
  ['Problem Statement', 'Vấn đề cần giải quyết'],
  ['Constraints', 'Ràng buộc'],
  ['Requirements', 'Yêu cầu'],
  ['Decision', 'Quyết định'],
  ['Consequences', 'Hệ quả'],
  ['Implementation', 'Triển khai'],
  ['Stories', 'Danh sách story'],
  ['Governing ADRs', 'ADR chi phối'],
  ['Definition of Done', 'Định nghĩa hoàn thành'],
  ['Next Step', 'Bước tiếp theo'],
  ['Next Steps', 'Bước tiếp theo'],
  ['Date', 'Ngày'],
  ['Architecture Diagram', 'Sơ đồ kiến trúc'],
  ['Alternatives Considered', 'Các phương án đã cân nhắc'],
  ['Alternative', 'Phương án'],
  ['Registration', 'Đăng ký'],
  ['Skills', 'Kỹ năng'],
  ['Core', 'Lõi'],
  ['Decision Summary', 'Tóm tắt quyết định'],
  ['Engine Risk', 'Rủi ro engine'],
  ['Layer', 'Layer'],
  ['Architecture Module', 'Module kiến trúc'],
  ['In Progress', 'Đang triển khai'],
  ['Complete', 'Hoàn tất'],
  ['Superseded', 'Đã được thay thế'],
  ['Acceptance Criteria', 'Tiêu chí chấp nhận'],
  ['Testing', 'Kiểm thử'],
  ['Risk', 'Rủi ro'],
  ['Reference', 'Tham chiếu'],
  ['Version', 'Phiên bản'],
  ['Breaking Changes', 'Thay đổi gây ảnh hưởng'],
  ['Deprecated APIs', 'API đã lỗi thời'],
  ['Current Best Practices', 'Best practice hiện tại'],
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'vi') return [];
      return walk(fullPath);
    }
    if (!entry.isFile()) return [];
    if (!/\.(md|mdx)$/i.test(entry.name)) return [];
    if (entry.name === 'index.mdx') return [];
    return [fullPath];
  });
}

function parseTitle(content, filePath) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  const titleLine = match?.[1]
    .split(/\r?\n/)
    .find((line) => line.trim().startsWith('title:'));

  if (titleLine) {
    return titleLine
      .replace(/^title:\s*/, '')
      .replace(/^['"]|['"]$/g, '')
      .trim();
  }

  const heading = content.match(/^#\s+(.+)$/m);
  if (heading) return heading[1].trim();

  return path.basename(filePath, path.extname(filePath)).replace(/[-_]+/g, ' ');
}

function translateText(value) {
  let output = value;
  for (const [source, target] of replacements) {
    output = output.replaceAll(source, target);
  }
  return output;
}

function yamlQuote(value) {
  return `'${value.replaceAll("'", "''")}'`;
}

function extractHeadings(content) {
  return [...content.matchAll(/^#{2,4}\s+(.+)$/gm)]
    .map((match) => translateText(match[1].replaceAll('`', '').trim()))
    .filter(Boolean)
    .slice(0, 12);
}

function inferKind(relativePath) {
  if (relativePath.startsWith('architecture/')) {
    return {
      area: 'Kiến trúc',
      purpose:
        'Trang này ghi lại quyết định kỹ thuật, bối cảnh, ràng buộc và hệ quả kiến trúc cho dự án.',
    };
  }
  if (relativePath.startsWith('design/')) {
    return {
      area: 'Thiết kế',
      purpose:
        'Trang này tóm tắt tài liệu thiết kế, yêu cầu gameplay, tiêu chuẩn asset hoặc đặc tả trải nghiệm.',
    };
  }
  if (relativePath.startsWith('production/')) {
    return {
      area: 'Sản xuất',
      purpose:
        'Trang này tóm tắt backlog, epic, story, QA evidence hoặc trạng thái sản xuất liên quan.',
    };
  }
  if (relativePath.startsWith('engine-reference/')) {
    return {
      area: 'Tham chiếu engine',
      purpose:
        'Trang này tóm tắt ghi chú Unity, API cần tránh và best practice khi triển khai.',
    };
  }
  if (relativePath.includes('registry')) {
    return {
      area: 'Registry',
      purpose:
        'Trang này giúp tra cứu liên kết giữa yêu cầu, thiết kế, kiến trúc và bằng chứng kiểm thử.',
    };
  }
  return {
    area: 'Tài liệu',
    purpose: 'Trang này tóm tắt nội dung dự án để tra cứu nhanh bằng tiếng Việt.',
  };
}

function slugFor(relativePath) {
  return '/' + relativePath.replace(/\\/g, '/').replace(/\.(md|mdx)$/i, '/').toLowerCase();
}

function buildSummaryPage(sourcePath) {
  const relativePath = path.relative(docsRoot, sourcePath).replace(/\\/g, '/');
  const content = fs.readFileSync(sourcePath, 'utf8');
  const sourceTitle = parseTitle(content, sourcePath);
  const title = translateText(sourceTitle);
  const headings = extractHeadings(content);
  const kind = inferKind(relativePath);
  const sourceUrl = slugFor(relativePath);

  const headingList =
    headings.length > 0
      ? headings.map((heading) => `- ${heading}`).join('\n')
      : '- Tài liệu gốc không có mục heading rõ ràng; đọc phần ghi chú và liên kết bản gốc để kiểm tra chi tiết.';

  return `---\ntitle: ${yamlQuote(title)}\ndescription: ${yamlQuote(`Bản tiếng Việt rút gọn cho ${title}.`)}\n---\n\n> Bản tiếng Việt rút gọn. Nội dung chi tiết đang được biên tập; trang này giúp đọc nhanh mà không rơi về bản English.\n\n## Tóm tắt\n\n**Khu vực:** ${kind.area}\n\n${kind.purpose}\n\n## Nội dung chính\n\n${headingList}\n\n## Cách dùng\n\n- Dùng trang này để nắm nhanh mục tiêu và phạm vi của tài liệu.\n- Khi triển khai hoặc kiểm thử, đối chiếu với GDD, ADR, epic/story và source code liên quan.\n- Nếu cần toàn bộ chi tiết từng bảng hoặc từng acceptance criteria, mở bản English gốc trong lúc bản dịch đầy đủ đang được hoàn thiện.\n\n## Bản gốc\n\n- [Mở bản English đầy đủ](${sourceUrl})\n`;
}

let created = 0;
for (const sourcePath of walk(docsRoot)) {
  const relativePath = path.relative(docsRoot, sourcePath);
  const targetPath = path.join(viRoot, relativePath);

  if (fs.existsSync(targetPath)) {
    const existing = fs.readFileSync(targetPath, 'utf8');
    if (!existing.includes('Bản tiếng Việt rút gọn. Nội dung chi tiết đang được biên tập')) {
      continue;
    }
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, buildSummaryPage(sourcePath), 'utf8');
  created++;
}

console.log(`Generated ${created} Vietnamese summary pages.`);
