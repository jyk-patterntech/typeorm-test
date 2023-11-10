import { ViewColumn, ViewEntity, DataSource } from 'typeorm';

import { Webtoon } from 'src/webtoon/webtoon.entity';
import { Round } from 'src/round/round.entity';
import { Character } from 'src/character/character.entity';

@ViewEntity({
  expression: (dataSource: DataSource) => dataSource.createQueryBuilder()
    .select("w.id", "webtoonId")
    .addSelect("w.title", "webtoonTitle")
    .addSelect("c.name", "characterName")
    .addSelect("c.roleType", "characterRole")
    .from(Webtoon, "w")
    .innerJoin(Round, "r", "w.id = r.webtoonId")
    .innerJoin(Character, "c", "r.id = c.roundId")
})
export class WebtoonCharactersView {
  @ViewColumn()
  webtoonId: number;

  @ViewColumn()
  webtoonTitle: string;

  @ViewColumn()
  characterName: string;

  @ViewColumn()
  characterRole: string;
}