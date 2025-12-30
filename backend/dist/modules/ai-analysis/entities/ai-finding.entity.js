"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIFinding = void 0;
const typeorm_1 = require("typeorm");
const ai_report_entity_1 = require("./ai-report.entity");
let AIFinding = class AIFinding {
    id;
    aiReport;
    label;
    confidenceScore;
};
exports.AIFinding = AIFinding;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AIFinding.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ai_report_entity_1.AIReport),
    __metadata("design:type", ai_report_entity_1.AIReport)
], AIFinding.prototype, "aiReport", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AIFinding.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], AIFinding.prototype, "confidenceScore", void 0);
exports.AIFinding = AIFinding = __decorate([
    (0, typeorm_1.Entity)()
], AIFinding);
//# sourceMappingURL=ai-finding.entity.js.map