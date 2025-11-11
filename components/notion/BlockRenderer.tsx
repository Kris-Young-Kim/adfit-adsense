'use client';

import type { NotionBlock } from '@/types/notion';
import ParagraphBlock from './ParagraphBlock';
import HeadingBlock from './HeadingBlock';
import CodeBlock from './CodeBlock';
import ImageBlock from './ImageBlock';
import ListBlock from './ListBlock';
import QuoteBlock from './QuoteBlock';
import DividerBlock from './DividerBlock';
import { useMemo } from 'react';

interface BlockRendererProps {
  blocks: NotionBlock[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  // 리스트 아이템들을 그룹화하여 ul/ol로 감싸기
  const renderedBlocks = useMemo(() => {
    const result: React.ReactNode[] = [];
    let currentList: NotionBlock[] = [];
    let currentListType: 'bulleted_list_item' | 'numbered_list_item' | null = null;

    blocks.forEach((block, index) => {
      const isListItem = block.type === 'bulleted_list_item' || block.type === 'numbered_list_item';

      if (isListItem) {
        const listType = block.type;
        
        // 리스트 타입이 변경되거나 첫 번째 리스트 아이템인 경우
        if (currentListType !== listType) {
          // 이전 리스트가 있으면 렌더링
          if (currentList.length > 0) {
            const ListTag = currentListType === 'bulleted_list_item' ? 'ul' : 'ol';
            result.push(
              <ListTag
                key={`list-${currentList[0].id}`}
                className={
                  currentListType === 'bulleted_list_item'
                    ? 'list-disc list-inside space-y-1 ml-4 my-2'
                    : 'list-decimal list-inside space-y-1 ml-4 my-2'
                }
              >
                {currentList.map((item) => (
                  <ListBlock key={item.id} block={item} />
                ))}
              </ListTag>
            );
          }
          // 새 리스트 시작
          currentList = [block];
          currentListType = listType;
        } else {
          // 같은 타입의 리스트 아이템 추가
          currentList.push(block);
        }
      } else {
        // 리스트가 아닌 블록인 경우
        // 이전 리스트가 있으면 먼저 렌더링
        if (currentList.length > 0) {
          const ListTag = currentListType === 'bulleted_list_item' ? 'ul' : 'ol';
          result.push(
            <ListTag
              key={`list-${currentList[0].id}`}
              className={
                currentListType === 'bulleted_list_item'
                  ? 'list-disc list-inside space-y-1 ml-4 my-2'
                  : 'list-decimal list-inside space-y-1 ml-4 my-2'
              }
            >
              {currentList.map((item) => (
                <ListBlock key={item.id} block={item} />
              ))}
            </ListTag>
          );
          currentList = [];
          currentListType = null;
        }

        // 일반 블록 렌더링
        switch (block.type) {
          case 'paragraph':
            result.push(<ParagraphBlock key={block.id} block={block} />);
            break;
          case 'heading_1':
          case 'heading_2':
          case 'heading_3':
            result.push(<HeadingBlock key={block.id} block={block} />);
            break;
          case 'code':
            result.push(<CodeBlock key={block.id} block={block} />);
            break;
          case 'image':
            result.push(<ImageBlock key={block.id} block={block} />);
            break;
          case 'quote':
            result.push(<QuoteBlock key={block.id} block={block} />);
            break;
          case 'divider':
            result.push(<DividerBlock key={block.id} />);
            break;
          default:
            break;
        }
      }

      // 마지막 블록인 경우 남은 리스트 렌더링
      if (index === blocks.length - 1 && currentList.length > 0) {
        const ListTag = currentListType === 'bulleted_list_item' ? 'ul' : 'ol';
        result.push(
          <ListTag
            key={`list-${currentList[0].id}`}
            className={
              currentListType === 'bulleted_list_item'
                ? 'list-disc list-inside space-y-1 ml-4 my-2'
                : 'list-decimal list-inside space-y-1 ml-4 my-2'
            }
          >
            {currentList.map((item) => (
              <ListBlock key={item.id} block={item} />
            ))}
          </ListTag>
        );
      }
    });

    return result;
  }, [blocks]);

  return <div className="notion-content space-y-4">{renderedBlocks}</div>;
}

