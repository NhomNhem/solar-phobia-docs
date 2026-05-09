import fs from 'node:fs';
import path from 'node:path';

const docsRoot = path.resolve('src/content/docs');
const viRoot = path.join(docsRoot, 'vi');

const generatedMarker = 'Bản dịch nháp tự động từ tài liệu English.';

const sentenceMap = [
  [
    'Player Controller is the input and movement system that translates player actions into game responses, enforcing what the player can and cannot do based on the current phase.',
    'Bộ điều khiển người chơi là hệ thống input và di chuyển, chuyển hành động của người chơi thành phản hồi trong game, đồng thời áp đặt những gì người chơi được hoặc không được làm theo phase hiện tại.',
  ],
  [
    'During Day phase, the player is restricted to UI-only interactions—selecting NPCs, assigning resources, and confirming choices—with no physical movement allowed.',
    'Trong phase ban ngày, người chơi chỉ được tương tác qua UI như chọn NPC, phân bổ tài nguyên và xác nhận lựa chọn; không cho phép di chuyển vật lý.',
  ],
  [
    'During Night phase, the system enables WASD movement, sprint, and contextual interaction as the player navigates the lane from start shrine to end shrine.',
    'Trong phase ban đêm, hệ thống bật di chuyển WASD, sprint và tương tác theo ngữ cảnh khi người chơi đi từ miếu bắt đầu tới miếu kết thúc.',
  ],
  [
    'The game requires a state machine that orchestrates the day/night loop with precise phase-gated system activation.',
    'Game cần một máy trạng thái điều phối vòng lặp ngày/đêm với việc bật/tắt hệ thống chính xác theo từng phase.',
  ],
  [
    'Without an authoritative controller, systems from different phases could overlap incorrectly (e.g., Day selection UI during Night survival), breaking the game\'s core identity as a consequence-driven experience.',
    'Nếu không có controller có thẩm quyền, các hệ thống thuộc nhiều phase có thể chồng lấn sai cách, ví dụ UI chọn lựa ban ngày xuất hiện trong sinh tồn ban đêm, làm hỏng bản sắc cốt lõi của game là trải nghiệm dẫn dắt bởi hậu quả.',
  ],
  [
    'The Phase State Machine uses VContainer for DI and R3 ReactiveProperty for reactive state management, with MessagePipe for one-way event dispatching.',
    'Máy trạng thái phase dùng VContainer cho DI, R3 ReactiveProperty để quản lý trạng thái reactive, và MessagePipe để phát event một chiều.',
  ],
  [
    'This epic is complete when:',
    'Epic này hoàn tất khi:',
  ],
];

const phraseMap = [
  ['Phase State Machine', 'Máy trạng thái phase'],
  ['state machine', 'máy trạng thái'],
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
  ['Architecture Decision Record', 'Bản ghi quyết định kiến trúc'],
  ['Architecture Diagram', 'Sơ đồ kiến trúc'],
  ['Problem Statement', 'Vấn đề cần giải quyết'],
  ['Governing ADRs', 'ADR chi phối'],
  ['GDD Requirements', 'Yêu cầu GDD'],
  ['Acceptance Criteria', 'Tiêu chí chấp nhận'],
  ['Definition of Done', 'Định nghĩa hoàn thành'],
  ['Next Steps', 'Bước tiếp theo'],
  ['Next Step', 'Bước tiếp theo'],
  ['Decision Summary', 'Tóm tắt quyết định'],
  ['Engine Risk', 'Rủi ro engine'],
  ['Alternatives Considered', 'Các phương án đã cân nhắc'],
  ['Implementation Notes', 'Ghi chú triển khai'],
  ['Implementation', 'Triển khai'],
  ['Consequences', 'Hệ quả'],
  ['Requirements', 'Yêu cầu'],
  ['Constraints', 'Ràng buộc'],
  ['Overview', 'Tổng quan'],
  ['Context', 'Bối cảnh'],
  ['Decision', 'Quyết định'],
  ['Status', 'Trạng thái'],
  ['Date', 'Ngày'],
  ['Stories', 'Danh sách story'],
  ['Story', 'Story'],
  ['Testing', 'Kiểm thử'],
  ['Risk', 'Rủi ro'],
  ['Reference', 'Tham chiếu'],
  ['Version', 'Phiên bản'],
  ['Breaking Changes', 'Thay đổi gây ảnh hưởng'],
  ['Deprecated APIs', 'API đã lỗi thời'],
  ['Current Best Practices', 'Best practice hiện tại'],
  ['In Progress', 'Đang triển khai'],
  ['Complete', 'Hoàn tất'],
  ['Superseded', 'Đã được thay thế'],
  ['Accepted', 'Đã chấp nhận'],
  ['Draft', 'Bản nháp'],
  ['Core', 'Lõi'],
  ['Layer', 'Layer'],
  ['Priority', 'Độ ưu tiên'],
  ['Type', 'Loại'],
  ['Title', 'Tiêu đề'],
  ['Requirement', 'Yêu cầu'],
  ['ADR Coverage', 'ADR bao phủ'],
  ['Architecture Module', 'Module kiến trúc'],
  ['Performance', 'Hiệu năng'],
  ['Reactive', 'Reactive'],
  ['FatalError', 'Lỗi nghiêm trọng'],
  ['Reset', 'Reset'],
  ['Resolve', 'Resolve'],
  ['Bootstrapping', 'Khởi tạo'],
  ['DayService', 'Dịch vụ ban ngày'],
  ['ChoiceLock', 'Khóa lựa chọn'],
  ['NightSurvival', 'Sinh tồn ban đêm'],
  ['Day phase', 'phase ban ngày'],
  ['Night phase', 'phase ban đêm'],
  ['Day Phase', 'Phase ban ngày'],
  ['Night Phase', 'Phase ban đêm'],
  ['day/night loop', 'vòng lặp ngày/đêm'],
  ['phase-gated', 'khóa theo phase'],
  ['reactive state', 'trạng thái reactive'],
  ['dependency injection', 'dependency injection'],
  ['deterministic transitions', 'chuyển trạng thái xác định'],
  ['reproducible runs', 'run có thể tái lập'],
  ['error cases', 'trường hợp lỗi'],
  ['lifecycle events', 'event vòng đời'],
  ['one-way event dispatching', 'phát event một chiều'],
  ['input and movement system', 'hệ thống input và di chuyển'],
  ['player actions', 'hành động người chơi'],
  ['game responses', 'phản hồi của game'],
  ['current phase', 'phase hiện tại'],
  ['UI-only interactions', 'tương tác chỉ qua UI'],
  ['physical movement', 'di chuyển vật lý'],
  ['WASD movement', 'di chuyển WASD'],
  ['contextual interaction', 'tương tác theo ngữ cảnh'],
  ['start shrine', 'miếu bắt đầu'],
  ['end shrine', 'miếu kết thúc'],
  ['earlier choices', 'lựa chọn trước đó'],
  ['unfair mechanics', 'cơ chế thiếu công bằng'],
  ['source generation', 'source generation'],
  ['source generator', 'source generator'],
  ['MonoBehaviour', 'MonoBehaviour'],
  ['ScriptableObject', 'ScriptableObject'],
  ['interface', 'interface'],
  ['service', 'service'],
  ['repository', 'repository'],
  ['observable', 'observable'],
  ['subscriber', 'subscriber'],
  ['subscribers', 'subscriber'],
  ['event', 'event'],
  ['events', 'event'],
  ['system', 'hệ thống'],
  ['systems', 'hệ thống'],
  ['state', 'trạng thái'],
  ['states', 'trạng thái'],
  ['selection', 'lựa chọn'],
  ['movement', 'di chuyển'],
  ['interaction', 'tương tác'],
  ['resource', 'tài nguyên'],
  ['resources', 'tài nguyên'],
  ['controller', 'controller'],
  ['manager', 'manager'],
  ['director', 'director'],
  ['module', 'module'],
  ['modules', 'module'],
  ['contract', 'contract'],
  ['contracts', 'contract'],
  ['fallback', 'fallback'],
  ['validation', 'kiểm tra hợp lệ'],
  ['validate', 'kiểm tra hợp lệ'],
  ['deterministic', 'xác định'],
  ['authoritative', 'có thẩm quyền'],
  ['gracefully', 'ổn định'],
  ['precise', 'chính xác'],
  ['active', 'đang hoạt động'],
  ['inactive', 'không hoạt động'],
  ['enabled', 'được bật'],
  ['disabled', 'bị tắt'],
  ['must', 'phải'],
  ['Must', 'Phải'],
  ['should', 'nên'],
  ['Should', 'Nên'],
  ['requires', 'yêu cầu'],
  ['Requires', 'Yêu cầu'],
  ['provide', 'cung cấp'],
  ['support', 'hỗ trợ'],
  ['handle', 'xử lý'],
  ['enforce', 'áp đặt'],
  ['orchestrates', 'điều phối'],
  ['translates', 'chuyển đổi'],
  ['connect', 'liên hệ'],
  ['connects', 'liên hệ'],
  ['random', 'ngẫu nhiên'],
  ['Theme', 'Chủ đề'],
  ['Overview', 'Tổng quan'],
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

function parseFrontmatter(content, filePath) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) {
    const fallbackTitle = path.basename(filePath, path.extname(filePath)).replace(/[-_]+/g, ' ');
    return { data: {}, body: content, title: fallbackTitle };
  }

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const titleMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!titleMatch) continue;
    data[titleMatch[1]] = titleMatch[2].replace(/^['"]|['"]$/g, '').trim();
  }

  return {
    data,
    body: content.slice(match[0].length),
    title: data.title || path.basename(filePath, path.extname(filePath)).replace(/[-_]+/g, ' '),
  };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function applyReplacement(value, source, target) {
  const escaped = escapeRegExp(source);
  const startsWord = /^[A-Za-z0-9_]/.test(source);
  const endsWord = /[A-Za-z0-9_]$/.test(source);
  const pattern = `${startsWord ? '(?<![A-Za-z0-9_])' : ''}${escaped}${endsWord ? '(?![A-Za-z0-9_])' : ''}`;
  return value.replace(new RegExp(pattern, 'g'), target);
}

function translateText(value) {
  let output = value;
  for (const [source, target] of sentenceMap) {
    output = applyReplacement(output, source, target);
  }
  for (const [source, target] of phraseMap.sort((a, b) => b[0].length - a[0].length)) {
    output = applyReplacement(output, source, target);
  }
  return output;
}

function yamlQuote(value) {
  return `'${value.replaceAll("'", "''")}'`;
}

function translateLine(line) {
  if (line.trim().startsWith('```')) return line;
  if (/^\s*import\s/.test(line)) return line;
  if (/^\s*<[^>]+>/.test(line)) return line;
  if (/^\s*\|?\s*-{3,}/.test(line)) return line;
  if (/^\s*!\[/.test(line)) return line;

  return translateText(line);
}

function translateBody(body) {
  let inFence = false;
  return body
    .split(/\r?\n/)
    .map((line) => {
      if (line.trim().startsWith('```')) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      return translateLine(line);
    })
    .join('\n')
    .replace(/\n{4,}/g, '\n\n\n');
}

function buildTranslatedPage(sourcePath) {
  const parsed = parseFrontmatter(fs.readFileSync(sourcePath, 'utf8'), sourcePath);
  const title = translateText(parsed.title);
  const description = parsed.data.description
    ? translateText(parsed.data.description)
    : `Bản dịch tiếng Việt cho ${title}.`;
  const body = translateBody(parsed.body).trimStart();

  return `---\ntitle: ${yamlQuote(title)}\ndescription: ${yamlQuote(description)}\n---\n\n> ${generatedMarker} Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.\n\n${body}`;
}

let written = 0;
for (const sourcePath of walk(docsRoot)) {
  const relativePath = path.relative(docsRoot, sourcePath);
  const targetPath = path.join(viRoot, relativePath);

  if (fs.existsSync(targetPath)) {
    const existing = fs.readFileSync(targetPath, 'utf8');
    const isGeneratedSummary =
      existing.includes('Bản tiếng Việt rút gọn. Nội dung chi tiết đang được biên tập') ||
      existing.includes(generatedMarker);
    if (!isGeneratedSummary) continue;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, buildTranslatedPage(sourcePath), 'utf8');
  written++;
}

console.log(`Wrote ${written} Vietnamese translated draft pages.`);
